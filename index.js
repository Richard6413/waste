// index.js
require("dotenv").config();

const path = require("path");
const express = require("express");
const { initializeApp } = require("firebase/app");

const server = express();
const PORT = process.env.PORT || 3000;

// ===============================
// Helper: read the first env variable that exists
// ===============================
function getEnv(...names) {
    for (const name of names) {
        const value = process.env[name];
        if (value && value.trim() !== "") {
            return value.trim();
        }
    }
    return undefined;
}

// ===============================
// Firebase Configuration
// ===============================
const firebaseConfig = {
    apiKey: getEnv("API_KEY", "FIREBASE_API_KEY", "VITE_FIREBASE_API_KEY"),
    authDomain: getEnv("AUTH_DOMAIN", "FIREBASE_AUTH_DOMAIN", "VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnv("PROJECT_ID", "FIREBASE_PROJECT_ID", "VITE_FIREBASE_PROJECT_ID")
};

// Check ALL required values at once
const missing = [];
if (!firebaseConfig.apiKey) missing.push("API_KEY");
if (!firebaseConfig.authDomain) missing.push("AUTH_DOMAIN");
if (!firebaseConfig.projectId) missing.push("PROJECT_ID");

if (missing.length > 0) {
    console.error("ERROR: Missing required values in your .env file:");
    missing.forEach((name) => console.error("  - " + name));
    console.error("\nAdd lines like these to .env (same folder as package.json):");
    console.error("  API_KEY=your_firebase_api_key");
    console.error("  AUTH_DOMAIN=your-project-id.firebaseapp.com");
    console.error("  PROJECT_ID=your-project-id");
    process.exit(1);
}

// ===============================
// Initialize Firebase
// ===============================
let firebaseApp;
try {
    firebaseApp = initializeApp(firebaseConfig);
    console.log(
        "Firebase initialized successfully for project:",
        firebaseApp.options.projectId
    );
} catch (error) {
    console.error("ERROR: Firebase failed to initialize:", error.message);
    process.exit(1);
}

// ===============================
// Middleware
// ===============================
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve frontend files
server.use(express.static(path.join(__dirname, "public")));

// ===============================
// Routes
// ===============================
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "JEMAK Waste Management System is running",
        firebaseProject: firebaseApp.options.projectId
    });
});

// 404 handler
server.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
server.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// ===============================
// Start Server
// ===============================
server.listen(PORT, () => {
    console.log("----------------------------------------");
    console.log("JEMAK Waste Management System");
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log("----------------------------------------");
});