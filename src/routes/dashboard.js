const router = require('express').Router();
const DiscordUser = require('../models/DiscordUser');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, async (req, res) => {
  const discordUser = await DiscordUser.findOne({ user: req.user.id });
  if (!discordUser) {
    return res.redirect('/');
  }
  res.render('dashboard', { discordUser });
});

router.get('/info', ensureAuthenticated, async (req, res) => {
  const discordUser = await DiscordUser.findOne({ user: req.user.id });
  //console.log(req.user)
  res.json(discordUser);
});

router.get('/settings', ensureAuthenticated, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
