// Webstack-Portfolio-Project/Server/routes/user.js

const express = require('express');
const { registerUser } = require('../controllers/register');
const { Loginhandler } = require('../controllers/login');
const {getUser, getAllUser} = require('../controllers/getUser');
const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');
const updateprofile = require('../controllers/updateprofile');
const {validatesusers,validateadmins} = require('../middleware/validateusers');
const { Logouthandler } = require('../controllers/Logout');
const router = express.Router();

// Route to handle user registration
router.get('/getuser/:id', validatesusers, getUser);
router.get('/getalluser',validateadmins, getAllUser);
router.put("/updateprofile/",validatesusers,updateprofile)
router.post('/create', validateadmins,createUser);
router.put('/update/', validateadmins,updateUser);
router.delete('/delete',validateadmins, deleteUser);
router.post('/register',  registerUser)
router.post('/login',  Loginhandler)
router.get("/logout",Logouthandler)
   


module.exports = router;
