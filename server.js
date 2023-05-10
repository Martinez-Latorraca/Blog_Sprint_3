require("dotenv").config();

const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const { passportConfig, passport } = require("./config/passport");
const flash = require("express-flash");

const app = express();

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(flash());

passportConfig();

app.set("view engine", "ejs");

routes(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${process.env.APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${process.env.APP_PORT}.\n`);
});
