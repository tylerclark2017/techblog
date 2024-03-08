const express = require('express');
const router = express.Router();

// Define routes for users

router.post('/', usersController.createUser); // Corrected function reference
router.post('/login', usersController.login); // Corrected function reference
router.post('/logout', usersController.logout); // Corrected function reference

const usersController = {
    // Login (refactor this and logout to match below functions)
    login: async (req, res) => {
        try {
            const dbUserData = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (!dbUserData) {
                res
                    .status(400)
                    .json({ message: 'Incorrect email or password. Please try again!' });
                return;
            }

            const validPassword = await dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res
                    .status(400)
                    .json({ message: 'Incorrect email or password. Please try again!' });
                return;
            }

            req.session.save(() => {
                req.session.loggedIn = true;
                console.log(
                    'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
                    req.session.cookie
                );

                res
                    .status(200)
                    .json({ user: dbUserData, message: 'You are now logged in!' });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Logout
    logout: async (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    // Add more controller methods as needed
};

// Add more routes as needed

module.exports = router;