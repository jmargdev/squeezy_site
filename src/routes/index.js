const router = require('express').Router();
const DiscordUser = require('../models/DiscordUser');
const { ensureAuthDashboard } = require('../config/auth');

// Landing page
router.get('/', async (req, res) => {
  // req.session.valid = true;
  if (req.user) {
    var discordUser = await DiscordUser.findOne({ user: req.user.id });
    res.redirect('/dashboard');
  } else {
    res.render('welcome', { discordUser });
  }
});
module.exports = router;
