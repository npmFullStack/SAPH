import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { authenticateToken } from "./authMiddleware.js";
import { createResponse } from "./helper.js";

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Upload image
router.post("/image", authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(createResponse("No image uploaded", false));
        }

        // In production, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
        // For now, return local path
        const imageUrl = `/uploads/${req.file.filename}`;
        
        res.json(createResponse("Image uploaded successfully", true, {
            imageUrl: imageUrl
        }));
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json(createResponse("Failed to upload image", false));
    }
});

export default router;