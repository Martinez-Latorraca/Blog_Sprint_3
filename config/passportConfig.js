const passport = require("passport");

const { User } = require("../models");

module.exports = function (app) {
  app.use(passport.session());
  
  require("./local")(passport);
  require("./facebook")(passport);

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
