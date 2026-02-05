import express from "express";
import pool from "./db.js";
import { authenticateToken, authorizeRoles } from "./authMiddleware.js";
import { createResponse } from "./helper.js";

const router = express.Router();

// Helper: Get user's active library
async function getActiveLibrary(userId) {
    const [libraries] = await pool.execute(
        "SELECT * FROM libraries WHERE user_id = ? AND is_active = TRUE LIMIT 1",
        [userId]
    );
    return libraries[0] || null;
}

// Helper: Get all libraries for a user
async function getUserLibraries(userId) {
    const [libraries] = await pool.execute(
        "SELECT * FROM libraries WHERE user_id = ? ORDER BY is_active DESC, created_at DESC",
        [userId]
    );
    return libraries;
}

// Helper: Create library
async function createLibrary(userId, name, imageUrl = null) {
    // First, set all existing libraries as inactive
    await pool.execute(
        "UPDATE libraries SET is_active = FALSE WHERE user_id = ?",
        [userId]
    );

    // Create new library as active
    const [result] = await pool.execute(
        "INSERT INTO libraries (user_id, name, image_url, is_active) VALUES (?, ?, ?, TRUE)",
        [userId, name, imageUrl]
    );

    const [newLibrary] = await pool.execute(
        "SELECT * FROM libraries WHERE id = ?",
        [result.insertId]
    );

    return newLibrary[0];
}

// Helper: Format library for frontend
function formatLibrary(library) {
    if (!library) return null;
    
    return {
        id: library.id,
        userId: library.user_id,
        name: library.name,
        imageUrl: library.image_url,
        isActive: library.is_active,
        createdAt: library.created_at,
        updatedAt: library.updated_at
    };
}

// 1. GET USER'S LIBRARIES
router.get("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const libraries = await getUserLibraries(userId);
        
        const formattedLibraries = libraries.map(library => formatLibrary(library));
        
        res.json(createResponse("Libraries retrieved", true, { libraries: formattedLibraries }));
    } catch (error) {
        console.error("Get libraries error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 2. GET ACTIVE LIBRARY
router.get("/active", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const activeLibrary = await getActiveLibrary(userId);
        
        if (!activeLibrary) {
            return res.json(createResponse("No active library", true, { library: null }));
        }
        
        res.json(createResponse("Active library retrieved", true, { 
            library: formatLibrary(activeLibrary) 
        }));
    } catch (error) {
        console.error("Get active library error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 3. CREATE NEW LIBRARY
router.post("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, imageUrl } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json(createResponse("Library name is required", false));
        }

        // Check if user already has too many libraries (optional limit)
        const userLibraries = await getUserLibraries(userId);
        if (userLibraries.length >= 10) { // Max 10 libraries per user
            return res.status(400).json(createResponse("Maximum number of libraries reached (10)", false));
        }

        const newLibrary = await createLibrary(userId, name.trim(), imageUrl);
        
        res.status(201).json(createResponse("Library created successfully", true, { 
            library: formatLibrary(newLibrary) 
        }));
    } catch (error) {
        console.error("Create library error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 4. SWITCH ACTIVE LIBRARY
router.put("/:id/switch", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const libraryId = req.params.id;

        // Check if library belongs to user
        const [libraries] = await pool.execute(
            "SELECT * FROM libraries WHERE id = ? AND user_id = ?",
            [libraryId, userId]
        );

        if (libraries.length === 0) {
            return res.status(404).json(createResponse("Library not found", false));
        }

        // Set all libraries as inactive
        await pool.execute(
            "UPDATE libraries SET is_active = FALSE WHERE user_id = ?",
            [userId]
        );

        // Set selected library as active
        await pool.execute(
            "UPDATE libraries SET is_active = TRUE WHERE id = ?",
            [libraryId]
        );

        // Get updated library
        const [updatedLibrary] = await pool.execute(
            "SELECT * FROM libraries WHERE id = ?",
            [libraryId]
        );

        res.json(createResponse("Library switched successfully", true, { 
            library: formatLibrary(updatedLibrary[0]) 
        }));
    } catch (error) {
        console.error("Switch library error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 5. UPDATE LIBRARY
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const libraryId = req.params.id;
        const { name, imageUrl } = req.body;

        // Check if library belongs to user
        const [libraries] = await pool.execute(
            "SELECT * FROM libraries WHERE id = ? AND user_id = ?",
            [libraryId, userId]
        );

        if (libraries.length === 0) {
            return res.status(404).json(createResponse("Library not found", false));
        }

        // Build update query
        const fields = [];
        const values = [];

        if (name !== undefined && name.trim() !== "") {
            fields.push("name = ?");
            values.push(name.trim());
        }

        if (imageUrl !== undefined) {
            fields.push("image_url = ?");
            values.push(imageUrl);
        }

        if (fields.length === 0) {
            return res.status(400).json(createResponse("No changes provided", false));
        }

        // Update library
        values.push(libraryId);
        await pool.execute(
            `UPDATE libraries SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        // Get updated library
        const [updatedLibrary] = await pool.execute(
            "SELECT * FROM libraries WHERE id = ?",
            [libraryId]
        );

        res.json(createResponse("Library updated successfully", true, { 
            library: formatLibrary(updatedLibrary[0]) 
        }));
    } catch (error) {
        console.error("Update library error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 6. DELETE LIBRARY
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const libraryId = req.params.id;

        // Check if library belongs to user
        const [libraries] = await pool.execute(
            "SELECT * FROM libraries WHERE id = ? AND user_id = ?",
            [libraryId, userId]
        );

        if (libraries.length === 0) {
            return res.status(404).json(createResponse("Library not found", false));
        }

        // Check if this is the last library
        const userLibraries = await getUserLibraries(userId);
        if (userLibraries.length <= 1) {
            return res.status(400).json(createResponse("Cannot delete the last library", false));
        }

        // Check if this is the active library
        const library = libraries[0];
        if (library.is_active) {
            // Set another library as active
            const [otherLibraries] = await pool.execute(
                "SELECT id FROM libraries WHERE user_id = ? AND id != ? LIMIT 1",
                [userId, libraryId]
            );
            
            if (otherLibraries.length > 0) {
                await pool.execute(
                    "UPDATE libraries SET is_active = TRUE WHERE id = ?",
                    [otherLibraries[0].id]
                );
            }
        }

        // Delete library
        await pool.execute("DELETE FROM libraries WHERE id = ?", [libraryId]);

        res.json(createResponse("Library deleted successfully", true));
    } catch (error) {
        console.error("Delete library error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

export default router;