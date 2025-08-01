const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review")

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
  url:String,
  filename:String,
},
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
    type:Schema.Types.ObjectId,
    ref: "Review",
    },
   
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"user"
  }
});


//Middleware for deleting reviews when any listing deleted 
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
  }

})

// Avoid model overwrite error in dev
const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
module.exports = Listing;
