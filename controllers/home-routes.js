const router = require('express').Router();
const { User, Blog } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    // const dbBlogData = await Blog.findAll({
    //   include: [
    //     {
    //       model: User,
    //       as: 'user',
    //       attributes: 'username',
    //     },
    //   ],
    // });

    // const blogs = dbBlogData.map((blog) =>
    //   blog.get({ plain: true })
    // );

    res.render('homepage', {
      // blogs,
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
router.get('/dashboard', (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
