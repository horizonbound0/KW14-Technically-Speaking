const router = require('express').Router();
const { User, Blog } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    // const dbBlogData = await Blog.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: 'username',
    //     },
    //   ],
    // });

    // const blogs = dbBlogData.map((blog) =>
    //   blog.get({ plain: true })
    // );

    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }
      
      res.render('homepage', {
        message: `countVisit: ${req.session.countVisit}`
        // blogs,
        // loggedIn: req.session.loggedIn,
      });
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
  if (req.session.loggedIn) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
