const mongoose =require("mongoose")
const Connetdb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (err) {
        console.error(err);
    }
}

module.exports=Connetdb