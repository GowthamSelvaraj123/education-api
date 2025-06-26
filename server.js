const express = require("express");
const app = express();
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")
const connectDB = require("./config/db");
const passport = require("passport");
require("./config/passport"); 
connectDB();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);
app.listen(5000, (req, res) => {
    console.log("The port started successfully")
})