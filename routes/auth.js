var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
//==================
//AUTH ROUTES
//==================

//sign-up form
router.get("/register", function(req,res){
    res.render("register.ejs");
});

//handle sign-up logic
router.post("/register", function(req,res){

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
            
        }
    });
});

//login form

router.get("/login", function(req,res){

    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
    
});

//Logout Route

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");

});



module.exports = router;