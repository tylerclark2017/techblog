const User = require('../models/User');

// Controller methods for users
const usersController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Add more controller methods as needed
};

module.exports = usersController;