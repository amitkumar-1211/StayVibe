
exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

