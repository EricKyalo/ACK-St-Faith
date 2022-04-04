const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");


    // GET Registration Page 
router.get("/register", (req, res) => {
  res.render("admin/register", {message: req.flash("message")})
});
 // set the user's local credentials

// POST /register user
router.post("/register", async(req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); 
  const name= req.body.username
  let newUser = {
    username: name,
    password: hashedPassword
  }
 console.log(newUser)

   // find a user in Mongo with provided username
const [registered] = await User.find({username: name})
try {
  // if there is no user with that username
  // save the user and redirect to sermonCreate
  if (!registered) {
    newUser = new User(newUser)
    await newUser.save()
    console.log('User Registration succesful ' + newUser);
    res.redirect("/sermonCreate");
  } else {
    req.flash("message", "Username already exists choose another one")
    res.render("admin/register", {message: req.flash("message")})
  }
    // In case of any error, give status code and send error
} catch (error) {
    console.log(error)
    res.status(500).send("Ooops Sorry Error Occured!!")
  }
})
module.exports = router

