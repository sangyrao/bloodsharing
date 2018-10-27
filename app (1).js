var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    flash = require("connect-flash"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    const puretext = require('puretext');
//mongoose.connect("mongodb://localhost/BloodShare");
mongoose.connect("mongodb://sangyrao:abhi199718@ds015942.mlab.com:15942/bloodshare");
var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
//SCHEMA SETUP
var Schema = new mongoose.Schema({
    username:String,
    City:String,
    Blood:String,
    Age: Number,
    Address: String,
    District: String,
    Mobile:Number,
    Email: String,
    optradio : String,
    Fresher: String,
    
    
}); 
 var Users  = mongoose.model("users",Schema); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(require("express-session")({
    secret: "abhishek and sangeeta",
    resave:false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


app.post("/Profile",function(req,res){
  var mailOptions = {
    from: "BloodShare✔ <projectlifeshare@gmail.com>", // sender address
    to: "projectlifeshare@gmail.com", // list of receivers
    subject: "Blood Requirement✔", // Subject line
    text: "Blood Needed✔", // plaintext body
    html:req.body.city+"\n"+req.body.Blood // html body
};
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});




  Users.find({"City":req.body.city,"Blood":req.body.Blood},function(err,docs){
       if(err){
           console.log(err);
       }else{
           res.render("Profile",{users:docs})
       }
   }) ; 
});


app.get("/Portfolio",function(req,res){
  Users.find({},function(err,docs){
       if(err){
           console.log(err);
       }else{
           res.render("Portfolio",{users:docs});
           
       }
   }) ; 
});
app.get("/",function(req,res){
   res.render("home");
});
app.get("/home",function(req,res){
   res.render("home");
});

app.get("/About",function(req,res){
   res.render("About");
});
app.get("/Contact",function(req,res){
   res.render("Contact");
});







app.get("/Signup",function(req,res){
   res.render("Signup");
});


//handling user sign up
app.post("/Signup", function(req, res){
    User.register(new User({
    username: req.body.username,
    optradio:req.body.optradio, 
    Blood:req.body.Blood,
    Age:req.body.Age, 
    Mobile:req.body.Mobile,
    Email:req.body.Email,
    Address:req.body.Address,
    City:req.body.City,
    District:req.body.District,
    optradio1:req.body.optradio1,
    }), req.body.password,function(err, user){
        if(err){
            req.flash("error","Signup Failed...Please Try Again!!");
            return res.render('Signup');
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","You have Sucessfully Signed Up!!!");
           res.redirect("/");
        });
    });
});




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("BloodShare Server Started...!!");
});

