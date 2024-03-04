const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all users, sorted by name
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Serialize user data for templates
    const users = userData.map(user => user.get({ plain: true }));

    // Render the homepage view with user data
    res.render('homepage', { users });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
