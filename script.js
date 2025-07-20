const exp=require("express");
const app=exp();
if(process.env.NODE_ENV != "production"){  
    require('dotenv').config()
}
const mongoose=require("mongoose");
let port=3000;
const ejsMate=require("ejs-mate");//Use for make layouts which is common layout used in all places
const path=require("path");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const listingRouter=require("./Routes/Listing.js");
const reviewRouter=require("./Routes/Review.js");
const userRouter=require("./Routes/User.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

// this condtion check our website is not used as production level because we are developing the website

const dbUrl=process.env.ATLASDB_URL;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(exp.urlencoded({extended:true}));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);//for ejs-mate
app.use(exp.static(path.join(__dirname,"/public")));
app.use(exp.static("public"));


async function main() {
    await mongoose.connect(dbUrl);
  }
main().then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{
    console.log(err);
});

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
         secret:process.env.SECRET
    },
    touchAfter:24*3600,
}) //It tells connect-mongo to only update the session in the database once per touchAfter interval, even if the session is accessed frequently.

store.on("error", (err) => {
   console.log("SESSION STORE ERROR:", err);
});


const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,//7 days time in milisec
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    },
}


app.use(session(sessionOptions));
app.use(flash());


//A middleware that initilize the passport
app.use(passport.initialize());
//A web application needs the ability to identify users as they browse page to page. This series of requests and responds, each associated with the same user, is known as a session
app.use(passport.session());
//use statuic authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
//To serialize the user
passport.serializeUser(User.serializeUser());
//To deSerialize the user 
passport.deserializeUser(User.deserializeUser());


//For flashing the messases 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user; //here req.user is the passport menthod that check that page is logged in or not by the user
    next();
})

// app.get("/demouser", async(req,res)=>{
//     let FakeUser=new User({
//         email: "123@gmail.com",
//         username: "Somnath"
//     });

//     let registeredUser=await User.register(FakeUser,"123@Som") //here we pass the fakeuser and password // Here register() will automatically check for if else part for user already exits or not 
//      res.send(registeredUser);
// })



//For using listing.js routes
//Its works like when ever the route is start with listing then the listings.js is used
app.use("/listings",listingRouter);

//For using reviews.js routes
app.use("/listings/:id/reviews",reviewRouter)


//for using User.js router
app.use("/",userRouter);


// app.get("/listing", async (req, res) => {
//     const sampleListing = new Listing({
//         title: "My own villa",
//         description: "Self buyed",
//         price: 12000000,
//         location: "Ara, Bihar",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("Sample is saved");
//     res.send("Successful Testing");
// });


//MiddleWare for error
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).send("Something Went Wrong");
});


app.listen(port,()=>{
    console.log("Working on port:",port);
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});
