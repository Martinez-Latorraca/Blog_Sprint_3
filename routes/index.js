const publicRoutes = require("./publicRoutes");
const privateRoutes = require("./privateRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use("/", publicRoutes);
  app.use("/admin", privateRoutes);
};
