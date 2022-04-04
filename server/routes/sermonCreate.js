const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon");


// get route for new form/page
router.get("/sermonCreate", (req, res) => {
    res.render("new/new", {sermon: new Sermon() } ) 
});


// post route
router.post("/sermonCreate", async (req, res) => {
    let sermon = new Sermon({
        title: req.body.title,
        theme: req.body.theme,
        date: req.body.date,
        preacher: req.body.preacher,
        sermon: req.body.sermon
    })
    try {
        sermon = await sermon.save()
        res.redirect(`sermon/${sermon.slug}`) // new Sermon created will be rendered from db in Sermon
        console.log(req.body)
    } catch(e) {
        console.log(e);
        res.render("new/new", {sermon: sermon}) 
        // returns us to the new page incase there's an error
    }
});

// using sermon.slug instead of sermon.id

module.exports = router;