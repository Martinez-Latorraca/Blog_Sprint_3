function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/login");
  }
}
function isAdmin(req, res, next) {
  console.log(req.user.role);
  req.user.role === process.env.IS_ADMIN ? next() : res.redirect("back");
}
function isEditor(req, res, next) {
  req.user.role === process.env.IS_EDITOR ? next() : res.redirect("back");
}
function isWriter(req, res, next) {
  req.user.role === process.env.IS_WRITER ? next() : res.redirect("back");
}

module.exports = { ensureAuthenticated, isAdmin, isEditor, isWriter };
