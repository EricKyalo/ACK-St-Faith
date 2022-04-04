const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon")



// get route

router.get("/", async(req, res) =>{ 
     const sermon = await Sermon.findOne({}).sort({date: -1 }).limit(1)

     try{
        res.render("index", { sermon })
     } catch (e) {
         console.log(e)
         return res.render("index")
        }
})

module.exports = router;

