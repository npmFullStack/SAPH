import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import {
    createResponse,
    isValidEmail,
    validatePassword,
    sanitizeUser
} from "./helper.js";
import { authenticateToken, authorizeRoles } from "./authMiddleware.js";

const router = express.Router();

// Helper: Find user by email
async function findUserByEmail(email) {
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
        email
    ]);
    return users[0] || null;
}

// Helper: Find user by ID
async function findUserById(id) {
    const [users] = await pool.execute(
        "SELECT id, first_name, last_name, email, role, status, created_at FROM users WHERE id = ?",
        [id]
    );
    return users[0] || null;
}

// Helper: Create new user
async function createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Only 'superadmin' or 'admin' roles allowed based on your users table
    const role = userData.role === "superadmin" ? "superadmin" : "admin";

    const [result] = await pool.execute(
        "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [
            userData.first_name,
            userData.last_name,
            userData.email,
            hashedPassword,
            role
        ]
    );

    return findUserById(result.insertId);
}

// Helper: Convert database user to frontend format (camelCase)
function formatUserForFrontend(user) {
    if (!user) return null;
    
    return {
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        status: user.status,
        id: user.id,
        createdAt: user.created_at
    };
}

// 1. REGISTER - Create new account
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Use 'admin' as default role (not 'student' since your table doesn't have it)
        const role = req.body.role === "superadmin" ? "superadmin" : "admin";

        // Check required fields
        if (!first_name || !last_name || !email || !password) {
            return res
                .status(400)
                .json(
                    createResponse("Please provide all required fields", false)
                );
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res
                .status(400)
                .json(createResponse("Invalid email address", false));
        }

        // Validate password strength
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json(createResponse(passwordError, false));
        }

        // Check if email already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res
                .status(409)
                .json(createResponse("Email already registered", false));
        }

        // Create user
        const newUser = await createUser({
            first_name,
            last_name,
            email,
            password,
            role
        });

        // Create JWT token
        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                name: `${newUser.first_name} ${newUser.last_name}`
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json(
            createResponse("Registration successful", true, {
                user: formatUserForFrontend(newUser),
                token
            })
        );
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 2. LOGIN - User sign in
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res
                .status(400)
                .json(createResponse("Email and password required", false));
        }

        // Find user
        const user = await findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json(createResponse("Invalid credentials", false));
        }

        // Check if account is active
        if (user.status !== "active") {
            return res
                .status(403)
                .json(createResponse("Account is inactive", false));
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res
                .status(401)
                .json(createResponse("Invalid credentials", false));
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                name: `${user.first_name} ${user.last_name}`
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json(
            createResponse("Login successful", true, {
                user: formatUserForFrontend(user),
                token
            })
        );
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 3. GET PROFILE - Get current user info
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return res
                .status(404)
                .json(createResponse("User not found", false));
        }

        res.json(
            createResponse("Profile retrieved", true, {
                user: formatUserForFrontend(user)
            })
        );
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 4. UPDATE PROFILE - Update user information
router.put("/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName } = req.body; // Note: using camelCase from frontend

        // Prevent changing email, role, or status
        if (req.body.email || req.body.role || req.body.status) {
            return res
                .status(403)
                .json(
                    createResponse(
                        "Cannot change email, role, or status",
                        false
                    )
                );
        }

        // Build update query
        const fields = [];
        const values = [];

        if (firstName) {
            fields.push("first_name = ?");
            values.push(firstName);
        }
        if (lastName) {
            fields.push("last_name = ?");
            values.push(lastName);
        }

        // If nothing to update
        if (fields.length === 0) {
            const user = await findUserById(userId);
            return res.json(
                createResponse("No changes made", true, {
                    user: formatUserForFrontend(user)
                })
            );
        }

        // Update database
        values.push(userId);
        await pool.execute(
            `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        // Get updated user
        const updatedUser = await findUserById(userId);
        res.json(
            createResponse("Profile updated", true, {
                user: formatUserForFrontend(updatedUser)
            })
        );
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json(createResponse("Server error", false));
    }
});

// 5. GET ALL USERS - Super Admin only
router.get(
    "/all-users",
    authenticateToken,
    authorizeRoles("superadmin"),
    async (req, res) => {
        try {
            const [users] = await pool.execute(
                "SELECT id, first_name, last_name, email, role, status, created_at FROM users"
            );

            // Format all users for frontend
            const formattedUsers = users.map(user => formatUserForFrontend(user));

            res.json(createResponse("Users retrieved", true, { users: formattedUsers }));
        } catch (error) {
            console.error("Get users error:", error);
            res.status(500).json(createResponse("Server error", false));
        }
    }
);

// 6. UPDATE USER STATUS - Superadmin only
router.put(
    "/users/:id/status",
    authenticateToken,
    authorizeRoles("superadmin"),
    async (req, res) => {
        try {
            const userId = req.params.id;
            const { status } = req.body;

            // Validate status value
            if (!["active", "inactive", "suspended"].includes(status)) {
                return res
                    .status(400)
                    .json(createResponse("Invalid status value", false));
            }

            // Check if user exists
            const user = await findUserById(userId);
            if (!user) {
                return res
                    .status(404)
                    .json(createResponse("User not found", false));
            }

            // Update status
            await pool.execute("UPDATE users SET status = ? WHERE id = ?", [
                status,
                userId
            ]);

            // Get updated user
            const updatedUser = await findUserById(userId);
            res.json(
                createResponse("User status updated", true, {
                    user: formatUserForFrontend(updatedUser)
                })
            );
        } catch (error) {
            console.error("Update status error:", error);
            res.status(500).json(createResponse("Server error", false));
        }
    }
);

export default router;