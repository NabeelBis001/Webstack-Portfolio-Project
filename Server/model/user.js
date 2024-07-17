const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    
   
    email:{
        type: String,
        required: true
    },
    
    roles: {
            type: Number,
            default: 2
    
    },
    password: {
        type: String,
        required: true
    },
   
    userrefreshToken:[String]

});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashedtoken = await bcrypt.hash(this.password, 8);
        this.password = hashedtoken;
    }

});




module.exports = mongoose.model('Userdetails', userSchema);
