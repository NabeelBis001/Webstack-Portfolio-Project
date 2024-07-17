const User = require('../model/user');

const registerUser = async (req, res) => {
    const { password, confirm, email, phone, firstname, lastname } = req.body;

    // Check if required fields are present
    if (!password || !confirm|| !email || !phone || !firstname || !lastname) {
        return res.status(400).json({ 'message':"All field are required" });
    }

    // Validate email format
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(email)) {
        return res.status(400).json({ 'message': 'Invalid email format.' });
    }

    // Validate password format (at least 8 characters, one uppercase, one lowercase, one digit)
    const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!password_regex.test(password)) {
        return res.status(400).json({ 'message': 'Invalid password format. It must contain at least 6 characters, one uppercase letter, one lowercase letter, and one digit.' });
    }

    // Check if password and confirm password match
    if (password !== confirm) {
        return res.status(400).json({ 'message': 'Password and confirm password do not match.' });
    }

    const duplicateEmail = await User.findOne({ email: email }).exec();

    if (duplicateEmail) {
        return res.status(401).json({ error: 'Email already used' });
    }

    try {
        const newUser = await User.create({
            "password": password,
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
        });

        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: { user: newUser },
            message: 'User registered successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

module.exports = { registerUser };
