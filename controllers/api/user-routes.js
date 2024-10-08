const router = require('express').Router();
const { User } = require('../../models');

// Sign-up
router.post('/signup', async (req, res) => {
  try {
    // password validation
    if (req.body.password.length < 8) {
      return res.status(400).json({
        message: 'Password must be 8 characters or longer.',
      });
    }
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json({
        user: newUser,
        message: 'You have signed up and are now logged in!',
      });
    });
    console.log('User made!');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  /* */
  try {
    const dbUserData = await User.findOne({
      where: { username: req.body.username },
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
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

// Logout
router.post('/logout', (req, res) => {
  /* */
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }

});

module.exports = router;
