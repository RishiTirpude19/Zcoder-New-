const User = require("../models/user-model");
const { errorHandeler } = require("../utils/error");

module.exports.showMyProblems = async(req,res ,next)=>{
    try {
        let user = await User.findById(req.user._id).populate("problems");
        let myProblems = user.problems;
        res.status(200).json(myProblems);
    } catch (error) {
        next(error)
    }
}

module.exports.myBookmarkedProblems = async(req,res,next)=>{
    try {
        let user = await User.findById(req.user._id);
        let bookmarkedProblems = user.otherBookMarkedProblems;
        res.status(200).json(bookmarkedProblems);
    } catch (error) {
        next(error);
    }
}

module.exports.updateProfile = async(req,res ,next)=>{
    try {
        let {username , email ,favlanguage,rating,platform} =req.body;
        let user = await User.findByIdAndUpdate(req.user._id ,{
            username, 
            email,
            favlanguage,
            rating,
            platform,
        } , {new : true})
        if(!user){
            next(404 ,"User Not found")
        }
        await user.save();  
        const {password : hashPassword , ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

module.exports.mySolutions = async(req,res,next)=>{
    try {
        let user = await User.findById(req.user._id);
        if(!user){
            return next(errorHandeler(404 , "User not found"));
        }
        let userSolution = user.solutions;
        res.status(200).json(userSolution);
    } catch (error) {
        next(error)
    }
}