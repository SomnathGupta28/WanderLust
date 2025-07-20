
const exp=require("express");
const router=exp.Router();
const User=require("../models/user");
const WrapAsync = require("../Utils/WrapAsync");
const passport=require("passport");
const flash=require("connect-flash");
const { saveRedirectUrl } = require("../middleware");

const userController=require("../controller/user");



router.route("/signup")
.get(userController.renderSignupForm)
.post( WrapAsync(userController.signup))

//Here password.authenticate automatically check for the old user which are store in database if user exits then it login otherwise its flash failure 
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl ,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}), userController.login);


router.get("/logout",userController.logout)

module.exports=router;