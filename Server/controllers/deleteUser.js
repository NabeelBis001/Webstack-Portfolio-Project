// Webstack-Portfolio-Project/Server/controllers/deleteUser.js
const User = require('../model/user');

const deleteUser = async (req, res) => {
  try {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const deluser= await User.findOne({ _id: req.body.id }).exec();
    if (!deluser) {
        return res.status(204).json({ "message": `No User matches ID ${req.body.id}.` });
    }
    await deluser.deleteOne(); //{ _id: req.body.id }


    res.status(200).json({
      status: 'success',
      data: { deluser },
      message: 'User deleted successfully',
    });


   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = deleteUser;
