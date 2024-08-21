const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// GET the for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      /*include: [
        {
          model: User,
          as: 'user',
          attributes: 'id',
        },
      ],*/
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {

    const usersBlogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const usersBlogs = usersBlogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      usersBlogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all users
router.get('/users', async (req, res) => {
  // find all users
  const userData = await User.findAll();

  return res.json(userData);
});

// Get all blogs
router.get('/blogs', async (req, res) => {
  // find all blogs
  const blogData = await Blog.findAll();

  return res.json(blogData);
});

// Get all blogs
router.get('/comments', async (req, res) => {
  // find all blogs
  const commentData = await Comment.findAll();

  return res.json(commentData);
});

module.exports = router; 