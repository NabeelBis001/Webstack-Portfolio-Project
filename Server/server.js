require('dotenv').config();
const express =require("express")
const mongoose =require("mongoose");
const Connet = require('./configs/databasecon');
const cred = require('./middleware/credentials');
const Options = require('./configs/corsconfig');
const cors =require("cors")
const app = express();
const port = 3000;
Connet()
app.use(cred)
app.use(cors(Options))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", require('./routes/user'))

mongoose.connection.once("open",()=>{
  console.log("connected")
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
});
