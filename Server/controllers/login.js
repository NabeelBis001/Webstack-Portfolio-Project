const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Loginhandler = async (req, res) => {
  const { email, password } = req.body;
  const cookies = req.cookies;

  if (!email || !password) {
    return res.status(400).json({ 'message': 'email and password are required.' });
  }

  try {
    const requireduser = await User.findOne({ email: email}).exec();
    if (!requireduser) {
      return res.status(400).json({ "message": 'Incorrect email or password' });
    }

    const passmatch = await bcrypt.compare(password, requireduser.password);

    if (passmatch) {
      const roles = requireduser.roles
      const id=requireduser._id

      const accessToken = jwt.sign(
        {
          "Userinfo": {
            "email": requireduser.email,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '500s' }
      );
console.log(roles)
      const getNewRefreshToken = jwt.sign(
        { "email": requireduser.email},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1000s' }
      );

      let getnewRefreshTokenArray = requireduser.userrefreshToken;

      if (cookies?.jwt) {
        const userrefreshToken = cookies.jwt;
        const userrequiredToken = await User.findOne({ userrefreshToken }).exec();

        if (!userrequiredToken) {
          getnewRefreshTokenArray = [];
        }

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure:true });
      }

      requireduser.userrefreshToken = [...getnewRefreshTokenArray, getNewRefreshToken];
      await requireduser.save();

      // Set refreshToken as a secure cookie
      res.cookie('jwt', getNewRefreshToken, { httpOnly: true, secure:true,sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      // Send authorization roles and access token to the user
      res.json({ accessToken, roles,id});
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { Loginhandler };
