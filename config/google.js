const GoogleStrategy = require("passport-google").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        returnURL: "http://localhost:3000/auth/google/return",
        realm: "http://localhost:3000/",
      },
      function (identifier, done) {
        console.log("logeando con google");
        User.findByOpenID({ openId: identifier }, function (err, user) {
          return done(err, user);
        });
      },
    ),
  );
};
