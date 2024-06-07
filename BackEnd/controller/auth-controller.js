const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const {errorHandeler} = require("../utils/error");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'superStrongSecret';
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt); 
        const user = new User({
            username,
            email,
            password: hashPassword,
        });
        await user.save();
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        const { password: savedPassword, ...rest } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...rest, token });
    } catch (error) {
        next(error);
    }
}

module.exports.signin = async (req,res,next)=>{
    try {
        const {email , password} = req.body;
        let validUser = await User.findOne({ email });
        if(!validUser){
            return next(errorHandeler(404 , "User not Found"));
        }
        const validPassword = await bcryptjs.compare(password , validUser.password);
        if(!validPassword) {
            return next(errorHandeler(404 , "Invalid Creadentials"));
        }
        const token = jwt.sign({id: validUser._id }, JWT_SECRET, { expiresIn: '1h' });
        const {password : hashPassword , ...rest} = validUser._doc;
        res.cookie("access_token" , token , {httpOnly :true}).status(200).json({...rest , token});
        
    } catch (error) {
        next(error);
    }
}

module.exports.logOut = async(req,res,next)=>{
    try {
        res.clearCookie("access_token").status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
}