const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

function passportConfig() {
  let checkPass;
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
      try {
        const user = await User.findOne({ where: { email: email } });
        user ? (checkPass = await bcrypt.compare(password, user.password)) : null;
        if (!user || !checkPass) {
          return done(null, false, { message: "Credenciales incorrectas" });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }),
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
}

module.exports = { passportConfig, passport };
