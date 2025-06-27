module.exports.isLogedin = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be signed in to create a listing!");
        return res.redirect("/login");
    }
    next();
};