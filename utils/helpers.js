// Example helper functions
const formatName = (name) => {
    return name.toUpperCase();
};

const validateEmail = (email) => {
    // Implement email validation logic
    return true; // Return true if email is valid, false otherwise
};

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Password validation function
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Username case sensitivity validation function
const validateUsernameCase = (username) => {
    return username.toLowerCase() !== username.toUpperCase();
};

// authentication middleware can go here

module.exports = {
    formatName,
    validateEmail,
    generateRandomNumber,
    validatePassword,
    validateUsernameCase
};