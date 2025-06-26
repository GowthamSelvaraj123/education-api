const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "Color@123";
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, newaddress, roles } = req.body;
        if (!name || !email || !password || !phone || !newaddress || !roles) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email is already registered." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone: phone.trim(),
            newaddress: newaddress.trim(),
            roles
        })
        await newUser.save();
        res.status(201).json({ success: true, message: "Register Successfully" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(409).json({ success: false, message: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(409).json({ success: false, message: "Password match not found" });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, roles: user.roles },
            SECRET_KEY,
            { expiresIn: '1d' }
        );
        res.status(201).json({ success: true, message: "Login Successfully", token });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}
const resetPasswordController = async (req, res) => {
    try{

    }
    catch(err)
    {

    }
}
const forgotPasswordController = async(req, res) => {
    try{

    }
    catch(err)
    {

    }
}
module.exports = { loginController, registerController };