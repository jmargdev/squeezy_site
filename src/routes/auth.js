const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get(
  '/redirect',
  passport.authenticate('discord', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })
);

// Logout handler
router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    req.flash('success_msg', 'Successfully logged out');
    res.redirect('/');
  } else {
    req.flash('error_msg', 'You need to be logged in to logout ;p');
    res.redirect('/');
  }
});

module.exports = router;
