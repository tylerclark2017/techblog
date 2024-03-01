const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });
    
      process.exit(0);
    };
    
    seedDatabase();

// get all users and blog posts, serialize with the tag name
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
                    // include an associated post
                }
            ]
        });

        const users = userData.map((user) => user.get({ plain: true }));

        // pass a single object instead of an array
        res.render('homepage', {
            users,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
};

module.exports = getData; 