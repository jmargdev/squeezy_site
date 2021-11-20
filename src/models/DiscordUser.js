const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: { type: 'string', required: true },
  username: { type: 'string', required: true }
});

const DiscordUser = (module.exports = mongoose.model(
  'DiscordUser',
  UserSchema
));
