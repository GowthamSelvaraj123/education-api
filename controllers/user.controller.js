const User = require("../models/user.model")
const getProfile = async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({success:false, message: 'User not found'});
        }
        res.status(200).json({success:true, message: 'Profile Fetch Successfully', data:user});
    }   
    catch(err)
    {
        res.status(500).json({success:true, message: 'Server Error', err});
    }
}
const updateProfile = async(req, res) => {
    try
    {
        const {name, email} = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, {name, email}, {new:true}).select("-password");
        res.status(200).json({success:true, message: 'Profile Updated', data:user});
    }
    catch(err)
    {
        res.status(500).json({success:true, message: 'Server Error', err});
    }
}
const deleteProfile = async(req, res) => {
    try
    {
        const deleteUser = await User.findByIdAndDelete(req.user.id);
        res.status(200).json({success:true, message: 'Profile Deleted'});
    }
    catch(err)
    {
        res.status(500).json({success:true, message: 'Server Error', err});
    }
}

module.exports = {getProfile, updateProfile, deleteProfile}