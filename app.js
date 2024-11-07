const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const expertRoutes = require('./routes/expertRoutes');
const adminRoutes = require('./routes/adminRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const travelRoutes = require('./routes/travelRoutes');

const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Session Middleware
app.use(session({
    secret: 'tugefjskd@#$%^543',  // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set true if using HTTPS
}));

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Database Connection
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/experts', expertRoutes);
app.use('/admin', adminRoutes);
app.use('/investments', investmentRoutes);
app.use('/api', investmentRoutes);
app.use('/users', investmentRoutes);

// Centralized Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
