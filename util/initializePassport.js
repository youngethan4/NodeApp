//Test
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

const init = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        let user = await db.User.findOne({ where: { username: username } });
        if (!user) return done(null, false);
        if (!validatePassword(user.password, password))
          return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};

const validatePassword = (pass1, pass2) => {
  return pass1 === pass2;
};

module.exports = init;
