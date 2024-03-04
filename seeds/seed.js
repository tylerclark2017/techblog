const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');
const userData = require('./userData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(userData, { individualHooks: true, returning: true });
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

const getData = async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: BlogPost,
                    as: 'blog_posts',
                    attributes: ['id', 'title', 'content', 'createdAt'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'createdAt'],
                }
            ]
        });

        const users = userData.map(user => user.get({ plain: true }));

        res.render('homepage', {
            users,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    seedDatabase,
    getData
};