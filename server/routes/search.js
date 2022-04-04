const express = require("express");
const router = express.Router();
const Sermon = require("../models/sermon")

router.post("/search", async(req, res) => {
    let searchTerm = req.body.searchTerm;
  
        const sermon = await Sermon.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });  try {

        if (sermon == null){
            // res.json(sermon)
            res.render("sermon/show", { sermon } );
        } else {
            res.send(`No results found for ${searchTerm}`)
        }
        console.log(req.body)
      } catch (error) {
       console.log(error)
      }
      
});


module.exports = router;