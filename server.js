// Require necessary modules
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize with MySQL database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Load models
const User = require('./models/User');

// Configure Handlebars template engine
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
});

// Create Express app
const app = express();

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}));

// Set up Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is wrong!');
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`);
    next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Secure HTTP headers
app.use(helmet());

// Define routes and controllers

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});