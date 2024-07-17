// Webstack-Portfolio-Project/Server/controllers/getUser.js
const User = require('../model/user');



getAllUser= async (req, res) => {
  const userall = await User.find();
  if (!userall) return res.status(204).json({ 'message': 'No user found.' });
  res.json(userall);
}

const getUser = async (req, res) => {
  try {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const user= await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {getAllUser,getUser};
