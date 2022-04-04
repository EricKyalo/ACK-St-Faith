const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon")

router.get("/show", async(req, res) =>{ 
    const sermon = await Sermon.find({}).sort({date: -1 }).limit(10)
   
    try{
       res.render("sermon/show", { sermon })
    } catch (e) {
        console.log(e)
        return res.render("index")
       }
})


module.exports =router;