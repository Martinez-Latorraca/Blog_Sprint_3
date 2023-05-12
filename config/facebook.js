const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../models");

const facebookConfig = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log(profile, accessToken, refreshToken);
        try {
          const user = await User.findOne({ where: { email: profile.email } });
          user ? (checkPass = await bcrypt.compare(password, user.password)) : null;
          if (!user || !checkPass) {
            return done(null, false, { message: "Credenciales incorrectas" });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
        }
      },
    ),
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = { facebookConfig };
