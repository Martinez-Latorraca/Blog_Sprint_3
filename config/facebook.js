const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../models");

module.exports = function (passport) {
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
          const user = await User.findOne({ where: { email: profile.emails[0].value } });
          if (user) {
            console.log("logueo correcto");
            done(null, user);
          } else {
            done(null, false, { message: "credenciales incorrectas" });
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      },
    ),
  );
};
