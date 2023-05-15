function isAdmin(req, res, next) {
  if (req.user.roleCode === 100) {
  }
  return next();
}

module.exports = isAdmin;
