const mongoose = require("mongoose");
const marked = require("marked") // converts our marked blog to html 
const slugify = require("slugify") // converts id in the url to title. makes url pretty

const sermonSchema = new mongoose.Schema(
    {
        title: {
            type: String
           
        },
        theme: {
            type: String
        
        },
        date: {
            type: String
            
        },
        preacher: {
            type: String
        
        },
        sermon: {
            type: String
        },
        slug: {
            type: String,
            required: true,
            unique: true
        } // Putting slug in the db so that we dont have 
        // to calculate the process every single time an article is being accessed
        // we calculate once save in the db and don't have to worry about it again
});

// function is going to run right before validation of article is done (pre) every time CRUD is done
sermonSchema.pre("validate", function(next) {
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
})

// for search
sermonSchema.index({ title: 'text', preacher: "text", theme: 'text' });

module.exports = mongoose.model("sermon", sermonSchema);