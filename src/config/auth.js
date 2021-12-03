module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please login to access this page');
    res.redirect('/');
  },
  ensureAuthDashboard: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    }
    next();
  }
};
