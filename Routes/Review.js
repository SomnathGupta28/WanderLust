const exp=require("express");
const router=exp.Router({mergeParams:true});
const wrapasyns = require("../Utils/WrapAsync.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewController=require("../controller/review.js");


// Review Route
router.post("/", isLoggedIn,reviewController.addReview);

//delete review route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapasyns(reviewController.deleteReview));


module.exports=router;