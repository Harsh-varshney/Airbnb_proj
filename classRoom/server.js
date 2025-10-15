const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.listen(3000, () => {
    console.log("listening at port 3000");
});

const sessionOptions = {secret : "mysupersecretstring", resave: false , saveUninitialized : true};
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

// for flash msgs
app.get("/register",(req,res) => {
    let {name = 'anonymous'} = req.query;
    req.session.name = name;
    
    if(name == "anonymous"){
        req.flash("error","user does not registered");
    }else{
        req.flash("success","user register successfully");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res) => {
    // res.render("page.ejs", {name: req.session.name});
    // console.log(req.flash("success"));
    res.render("page.ejs",{name : req.session.name});
})


// app.get("/reqcount", (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

app.get("/test",(req,res) => {
    res.send("test successful"); 
});



// ----------cookies-----------

// app.use(cookieParser("secretcode"));
// // -----signed cookies
// app.get("/getsignedcookie",(req,res) => {
//     res.cookie("made-in","India",{ signed : true });
//     res.send("signed cookie set");
// });

// app.get("/verify",(req,res) => {
//     // console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("cookies verified");
// })

// app.get("/getcookies",(req,res) => {
//     res.cookie("Greet","Hello");
//     res.cookie("madeIn","India");
//     res.send("i send cookie");
// });

// app.get("/greet",(req,res) => {
//     let {name = "anonymous"} = req.cookies;
//     res.send(`hii, ${name}`);
// })

// app.get("/",(req,res) => {
//     console.dir(req.cookies);
//     res.send("i am root route");
// });

// app.use("/users",users);
// app.use("/posts",posts);