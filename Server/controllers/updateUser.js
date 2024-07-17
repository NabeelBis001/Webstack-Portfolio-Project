const User = require('../model/user');

const updateUser = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const upuser = await User.findOne({ _id: req.body.id }).exec();
    if (!upuser) {
      return res.status(204).json({ "message": `No userid matches ID ${req.body.id}.` });
    }

    if (req.body?.firstname) upuser.firstname = req.body.firstname;
    if (req.body?.lastname) upuser.lastname = req.body.lastname;
    if (req.body?.phone) upuser.phone = req.body.phone;
    if (req.body?.password) upuser.password = req.body.password;

    //
    if (req.body?.roles !== undefined) {
      const rolesNumber = parseInt(req.body.roles);
      if (isNaN(rolesNumber)) {
        return res.status(400).json({ "message": "Roles must be a number." });
      }
      upuser.roles = rolesNumber;
    }

    if (req.body?.email) upuser.email = req.body.email;

    await upuser.save();

    res.status(200).json({
      status: 'success',
      data: { upuser },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = updateUser;
