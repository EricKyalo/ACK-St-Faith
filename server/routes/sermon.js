const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon")

router.get("/sermon", async(req, res) =>{ 
    const sermon = await Sermon.find({}).sort({date: -1 }).limit(10)
    try{
       res.render("sermon/sermon", { sermon })
    } catch (e) {
        console.log(e)
        return res.render("index")
       }
})

router.get("/sermon/:slug", async(req, res) =>{ 
    const { id } = req.params
    const sermon = await Sermon.findOne({ slug: req.params.slug});
    try{
        res.render("sermon/sermon", { sermon })
    } catch (e) {
        console.log(e)
        return res.render("index")
       }
})


module.exports =router;

