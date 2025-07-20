
const User = require("../models/user");


module.exports.renderSignupForm=(req,res)=>{
    res.render("./user/signUp.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
 let {username,email,password} = req.body;
    const newUser= new User({email,username});
    const registerUser=await User.register(newUser,password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{ //this method is used for when the user is signup then it automatically login the same user 
        if(err){
            return next(err);
        }
        req.flash("success" , "Welcome to Wanderlust! ");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.login=async(req,res)=>{
   req.flash("success" ,"Welcome back to WanderLust!");
   let redirectUrl=res.locals.redirectUrl || "/listings"; //This is used because if we directly login then we go to /listings and when we login after clicking on add,edit,delete then after login we go to add,edit,delete page respectively without redirecting to home page 
   res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out");
         res.redirect("/listings");
    })
   
}