const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")


// GET /admin login route
router.get("/login", (req, res) => {
  if (!req.session.username) {
  res.render("admin/login", {message: req.flash("message") })
  } else {
    res.redirect("/sermonCreate")
  }
});


// POST /signin
router.post("/login", async(req, res) => {
  try {
     // find a user in Mongo with provided username
    // if !user username send msg
  const [validUser] = await User.find({username: req.body.username})
    if (!validUser) {
      req.flash("message", "User Does Not Exist")
      res.render("admin/login", {message: req.flash("message") })
      } else {
   
  // if user with username exists check if passwords match
  // if match success redirect 
      const match = await bcrypt.compare(req.body.password, validUser.password) 
      if (match) {
      console.log("success")
      req.session.username = req.body.username
      res.redirect("/sermonCreate")
      } else {
        req.flash("message", "Wrong Password")
        res.render("admin/login", {message: req.flash("message")})
      }
    }
    } catch (error) {
      console.log(error)
      res.status(500).send("Ooops Sorry Error Occured!!")
    }
  })

module.exports = router