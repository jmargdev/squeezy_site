const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');
const scopes = ['identify', 'guilds'];

module.exports = function (passport) {
  // Discord passport strategy
  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK_URL,
        scope: scopes
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await DiscordUser.findOne({ discordId: profile.id });
          if (user) {
            await DiscordUser.findOneAndUpdate({
              discordId: profile.id,
              username: profile.username,
              discriminator: profile.discriminator,
              avatar: profile.avatar,
              mfaEnabled: profile.mfa_enabled,
              guilds: profile.guilds
            });
            done(null, user);
          } else {
            const newUser = await DiscordUser.create({
              discordId: profile.id,
              username: profile.username,
              discriminator: profile.discriminator,
              avatar: profile.avatar,
              mfaEnabled: profile.mfa_enabled,
              guilds: profile.guilds
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
          }
        } catch (err) {
          console.log(err);
          done(err, null);
        }
      }
    )
  );
};
passport.serializeUser((user, done) => {
  // console.log('Serializing user ...');
  // console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id).then(user => {
    console.log('Deserializing user ...');
    if (user) done(null, user.id);
  });
});
