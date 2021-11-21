const router = require('express').Router();
const DiscordUser = require('../models/DiscordUser');
const { ensureAuthDashboard } = require('../config/auth');

// Landing page
router.get('/', ensureAuthDashboard, (req, res) => res.render('welcome'));
module.exports = router;
