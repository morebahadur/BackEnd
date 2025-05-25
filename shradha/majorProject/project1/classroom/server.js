const express = require('express');
const app = express();
const users = require('./routes/user');
const posts = require('./routes/post');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/users",users);
app.use("/posts",posts);


//session 
const sessionOptions = {
    secret:"secretCode",
    resave:false, 
    saveUninitialized:true,
}
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res) => {
    let {name="anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error", "You are not registered!");
    }else{
        req.flash("success", "You are registered successfully");
    }
    res.redirect("/hello"); 
});

app.get("/hello",(req,res) =>{
    res.render("page.ejs",{name:req.session.name});
});


// app.use(cookieParser("secreteCode"));
// app.get("/getsignedcookie", (req, res) =>{
//     res.cookie("made_in","india", {signed:true});
//     res.send("cookie set");
// })
// app.get("/getCookie", (req, res) => {
//     res.cookie("greeting", "hello");
//     res.cookie("user", "shradha");
//     res.send("cookie set");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("cookie verified");	
// })
// app.get("/greet",(req,res) =>{
//     let {name="anonymous"} = req.cookies;
//     res.send("hello " + name);
// })
// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("i am the root route!");
// });


//session
// app.get("/test", (req, res) => {
//     res.send("session test");
// });

// app.get("/getsessionCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send("session count is " + req.session.count);
// })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});