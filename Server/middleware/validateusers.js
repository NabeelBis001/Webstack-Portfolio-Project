const jwt = require('jsonwebtoken');

const validatesusers = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            // Check if the user has the required role
            const role=decoded.Userinfo.roles
            console.log(decoded.Userinfo.roles)
            if (role !== 2 && role !== 3)return res.sendStatus(401);
console.log( decoded.Userinfo.roles)
            req.user = decoded.Userinfo.email;
            req.roles = decoded.Userinfo.roles;

            // Call next() only if everything is fine
            next();
        }
    );
};

const validateadmins = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            // Check if the user has the required role
            const role=decoded.Userinfo.roles
            console.log(decoded.Userinfo.roles)
            if (role!=3 )return res.sendStatus(403);
console.log( decoded.Userinfo.roles)
            req.user = decoded.Userinfo.email;
            req.roles = decoded.Userinfo.roles;

            // Call next() only if everything is fine
            next();
        }
    );
};
module.exports = {validateadmins,validatesusers}
