const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dbConnection = require("./client/dbconnection");
const MongoStore = require("connect-mongo")(session);
const passport = require("./client/src/utils/passport");
// const routes = require("./routes/api");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const user = require("./routes/user");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
    secret: "na-zdorove", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);
app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser

// Add routes, both API and view
// app.use("/api", routes);
app.use("/user", user);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/parky", {
  useCreateIndex: true,
  useNewUrlParser: true
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
