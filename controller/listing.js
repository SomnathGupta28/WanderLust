const Listing=require("../models/listing")

module.exports.index=async (req,res)=>{
     const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{ //isLoggedIn is a middleware which is imported from middleware.js
    res.render("listings/new.ejs");
}

module.exports.createListing =async (req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created !");
    res.redirect("/listings");
    
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({
        path:"reviews",
    populate:{
        path:"author",
    },
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exit!");
        res.redirect("/listings");
    }

    res.render("listings/show.ejs",{listing});
}

module.exports.renderForm=async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing You requested for does not exist! ");
        res.redirect("/listings");
    }
     
    res.render("listings/edit.ejs",{listing});
}

module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    if(typeof req.file!="undefined"){
        let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
     }
 
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success","Listing Deleted !");
    res.redirect("/listings");
}