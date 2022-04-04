const mongoose = require('mongoose');

const connectDB =  async() => {
    try{
    const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});
console.log(`MongoDB Connected: ${db.connection.host}`)
    }catch(err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB