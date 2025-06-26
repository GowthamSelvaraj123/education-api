const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const SECRET_KEY = process.env.JWT_SECRET || "Color@123";
const nodemailer = require('nodemailer');
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
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and new password are required." });
        }

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password has been reset successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiration = Date.now() + 3600000;
        user.resetToken = resetToken;
        user.resetTokenExpiration = tokenExpiration;
        await user.save();
        const resetLink = `http://localhost:5000/api/auth/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: `"Support Team" <${process.env.SMTP_EMAIL}>`,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <p>Hello ${user.name || "User"},</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not request this, you can ignore this email.</p>
                <br>
                <p>Thanks,<br/>Your Team</p>
            `
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Password reset link sent to your email." });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." })
    }
}

const logoutController = async(req, res) => {
    req.logout(() => {
        res.status(200).json({ success: true, message: "Logged out successfully" });
    });
}
module.exports = { loginController, registerController, forgotPasswordController, resetPasswordController, logoutController };