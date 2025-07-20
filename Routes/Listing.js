const exp=require("express");
const router=exp.Router();
const Listing=require("../models/listing.js");
const wrapasyns = require("../Utils/WrapAsync.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController=require("../controller/listing.js")
const multer=require("multer");//multer is used for phares the form
const {storage}=require("../cloudinary.js")
const upload=multer({ storage });  
//   this function extract the file from the from and save it to upload folder



//router.route returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware. Use router.route to avoid duplicate route naming and thus typing errors.

router.route("/")
.get(listingController.index)//Index Route(Home Route)
.post( isLoggedIn, upload.single("listing[image]") ,wrapasyns(listingController.createListing))//For new Listing  //step:2 create route for new listing 



//For new Listing 
// step 1: render form
router.get("/new",isLoggedIn ,listingController.renderNewForm)



router.route("/:id")
.get(listingController.showListing)//show route
.put(isLoggedIn,isOwner, upload.single("listing[image]") ,listingController.updateListing)//For update and edit  //step 2: put request to update 
.delete(isLoggedIn,isOwner ,listingController.deleteListing)//Delete route



//For update and edit
//Step 1: Render a form 
router.get("/:id/edit" ,isLoggedIn,isOwner,listingController.renderForm)


module.exports=router;