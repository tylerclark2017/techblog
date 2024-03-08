// need to create routes for Dashboard here
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../utils/auth.js')

router.get('/dashboard', ensureAuthenticated, (req, res) => {
res.render('dashboard', {
    user: req.user,
    posts: req.user.posts
});
});

router.post('/dashboard/create-post', ensureAuthenticated, (req, res) => {
    const { title, body } = req.body;
  const newPost = { title, body };

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    user.posts.push(newPost);
    user.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      req.flash('success', 'Post created successfully');
      res.redirect('/dashboard');
    });
  });
});

router.put('/dashboard/update-post/:id', ensureAuthenticated, (req, res) => {
    const { title, body } = req.body;
    const postId = req.params.id;
  
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      const postIndex = user.posts.findIndex((post) => post._id.toString() === postId);
  
      if (postIndex === -1) {
        return res.status(404).send('Post not found');
      }
  
      user.posts[postIndex].title = title;
      user.posts[postIndex].body = body;
  
      user.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
  
        req.flash('success', 'Post updated successfully');
        res.redirect('/dashboard');
      });
    });
  });

  router.delete('/dashboard/delete-post/:id', ensureAuthenticated, (req, res) => {
    const postId = req.params.id;
  
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      const postIndex = user.posts.findIndex((post) => post._id.toString() === postId);
  
      if (postIndex === -1) {
        return res.status(404).send('Post not found');
      }
  
      user.posts.splice(postIndex, 1);
  
      user.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
  
        req.flash('success', 'Post deleted successfully');
        res.redirect('/dashboard');
      });
    });
  });