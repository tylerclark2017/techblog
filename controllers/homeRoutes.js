const router = require('express').Router();

const User = require('../models/User');

const Post = require('../models/Post');

// Controller methods for users

// routes needed: login, logout, sign-up, to a specific post, and home page

router.get('/', (req, res) => {
    // Check if user is signed in
    if (req.session.user) {
      // Fetch existing blog posts if any
      Post.find({})
        .then(posts => {
          res.render('homepage', { posts: posts, user: req.session.user });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Error fetching posts');
        });
    } else {
      res.render('homepage', { posts: [], user: null });
    }
  });
  
  // Login route
  router.get('/login', (req, res) => {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('login');
    }
  });
  
  // Logout route
  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  
  // Sign-up route
  router.get('/signup', (req, res) => {
    if (req.session.user) {
      res.redirect('/');
    } else {
      res.render('signup');
    }
  });
  
  // Post route
  router.get('/post/:id', (req, res) => {
    if (req.session.user) {
      Post.findOne({ _id: req.params.id })
        .populate('comments.user')
        .then(post => {
          res.render('post', { post: post, user: req.session.user });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Error fetching post');
        });
    } else {
      res.redirect('/login');
    }
  });
  
  // Dashboard route
  router.get('/dashboard', (req, res) => {
    if (req.session.user) {
      User.findOne({ _id: req.session.user._id })
        .populate('posts')
        .then(user => {
          res.render('dashboard', { user: user });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Error fetching dashboard');
        });
    } else {
      res.redirect('/login');
    }
  });
  
  // Add new
  
  
  
module.exports = router;