const Listing=require("./models/listing")
const Review=require("./models/review")



module.exports.isLoggedIn =(req,res,next) =>{
     //isAuthenticated checks if the user is already login then it give u access to add listing otherwise its redirect to login page 
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; //Here req.originalUrl is conatin the url which we try to visit before login and we use the same url to redirect after the login 
        req.flash("error","You must be logged in to create listing!")
         return res.redirect("/login");
    }
    next();
}

//This middleware is used for storing the before login page url into local session because in req.originalUrl change when we login or logout
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


//This is used to check the owner is real to edit the listing or via hochpoch
module.exports.isOwner= async(req,res,next)=>{
     let {id}=req.params;
        let listing=await Listing.findById(id);
        if(! listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You are not the ower of this listing");
            return res.redirect(`/listings/${id}`)
        }
next();
};


module.exports.isReviewAuthor= async(req,res,next)=>{
     let {reviewId,id}=req.params;
        let review=await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error","You are not the author of this review");
            return res.redirect(`/listings/${id}`)
        }
next();
};