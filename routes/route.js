const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');

router.get("/", (req, res) => {
    res.render("homepage");
});
router.get("/signup", userController.signup_form);
router.post("/signup", userController.adding_user);
router.get("/ismember", userController.isMemberCheckPage);
router.post("/ismember", userController.isMemberCheckFunction);
router.get("/login", userController.LoginPage);

// Corrected POST /login route
router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/signup');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // After successful login, redirect to the login check function
            return userController.LoginCheck(req, res, next);
        });
    })(req, res, next);
});

module.exports = router;
