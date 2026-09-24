// index.js
require('dotenv').config();

console.log("Server is running...");

// Example Firebase import
const firebase = require("firebase");

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
