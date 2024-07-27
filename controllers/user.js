const User = require("../models/user.js");


module.exports.rendersignUp = (req,res) =>{
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req,res) =>{
    try{
        let {username , email , password} = req.body;
        // console.log(username + " " + email + " " + password);
        const newUser = new User({email,username})
        let registerUser = await User.register(newUser,password);
         
        console.log(registerUser);

        // console.log(registerUser);
        req.login(registerUser,((err) =>{
            if(err){next(err);}
            req.flash("success" , "Welcome to Wayfarer!");
            return res.redirect("/listings");
        }))
    } catch(err){
        // console.log(err);
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.renderlogIn = (req,res) =>{
    res.render("users/login.ejs");
}
module.exports.logIn = async(req,res) =>{
    req.flash("success" , "Welcome to Wayfarer");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logOut = (req,res) =>{
    req.logOut((err) =>{
        if(err){
            next(err);
        }
        req.flash("success" , "You are Logged Out!");
        res.redirect("/listings");
    });
}