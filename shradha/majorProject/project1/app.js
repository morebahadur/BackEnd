const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then((res) => {
    console.log("dbs connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  }
}

app.get("/", (req, res) => {
  res.send("I am root.");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    username: "demo",
    email: "dddd@gmail.com",
    password: "demo1234"
  });
  let registerUser = await User.register(fakeUser, "helloword");
  res.send(registerUser);
})

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "page not found!"));
// });




app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.use((err, req, res, next) => {
  let { status = 500, message } = err;
  // res.status(status).send(message);
  console.log(err);
  res.render("error", { message });
});



app.listen(8080, (req, res) => {
  console.log("i am listenning port 8080!");
});
