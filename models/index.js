const User = require('./User');

module.exports = {
    User,
    login: async (username, password) => {
        const user = await User.findOne({ where: { username } });
        if (!user || !user.checkPassword(password)) {
            throw new Error('Invalid username or password');
        }
        return user;
    },
    logout: (user) => {
        // Perform logout actions, such as clearing the user's session
    },
    register: async (username, password) => {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const newUser = await User.create({ username, password });
        return newUser;
    },
    checkCredentials: (user) => {
        // Perform additional checks on user credentials or session information
    }
};