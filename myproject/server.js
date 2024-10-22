// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Set the upload destination
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ storage: storage });

// Handle the POST request for uploading grocery items
app.post('/api/grocery-items', upload.single('image'), (req, res) => {
    const { name, quantity, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store the relative path

    const newItem = {
        id: Date.now(), // Replace with your ID generation logic
        name,
        quantity,
        price,
        image,
    };

    // Save newItem to your database here (for demonstration, we'll just log it)
    console.log('New Item:', newItem);

    // Send back the newly created item as a response
    res.status(201).json(newItem);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
