const router = require('express').Router();

function isAuthenticated(req, res, next) {
  if (req.user) {
    // User is authenticated
    return next();
  }
  // User is not authenticated
  res.redirect('/');
}

router.get('/', isAuthenticated, function (req, res) {
  res.sendStatus(200);
});

router.get('/settings', isAuthenticated, function (req, res) {
  res.sendStatus(200);
});

module.exports = router;
