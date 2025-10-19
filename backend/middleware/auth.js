import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Added .js extension

export const verifyToken = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                error: "Access denied. No token provided." 
            });
        }

        // Verify the token
        // eslint-disable-next-line no-undef
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ 
                success: false, 
                error: "No valid authorization token." 
            });
        }

        // Fix: findByPk instead of findByYd, and check your User model structure
        const user = await User.findByPk(decoded.id || decoded.userId); // Adjust based on your JWT payload
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: "User not found" 
            });
        }

        // Attach user to request for use in other middleware/routes
        req.user = user;
        next();

    } catch (err) {
        console.error("Token verification error:", err);
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                error: "Invalid token" 
            });
        }
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                error: "Token expired" 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            error: "Token verification failed" 
        });
    }
};