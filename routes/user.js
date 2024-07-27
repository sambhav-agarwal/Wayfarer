const express = require("express");
const router = express.Router({});
const wrapAsyc = require("../utils/wrapAsyc");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.rendersignUp)
    .post(wrapAsyc(userController.signUp));


router
    .route("/login")
    .get(userController.renderlogIn)
    .post(saveRedirectUrl , passport.authenticate("local",{failureRedirect : "/login" , failureFlash: true}) ,wrapAsyc (userController.logIn));


router.get("/logout" , userController.logOut);

module.exports = router;