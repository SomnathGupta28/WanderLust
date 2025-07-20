const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data= initData.data.map((obj)=>({...obj,owner:"686f8b03968e3bc9823a3067"})); //this is used to add owner object to the database for all listing // This is done in the end so we use map that find all the lsiting and add a new object owner 
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();