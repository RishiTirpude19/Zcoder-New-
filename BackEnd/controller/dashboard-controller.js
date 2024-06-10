const Problem = require("../models/problem-model");
const User = require("../models/user-model");

module.exports.showAllPublicProblem = async(req,res,next)=>{
    try {
        let allProblems = await Problem.find({choice : "public"}).populate("user");
        res.status(200).json(allProblems);
    } catch (error) {
        next(error);
    }
}

module.exports.showTopUsers = async(req,res,next)=>{
    try {
        const topUsers = await User.find()
            .sort({ rating: -1 })
            .limit(10);
        res.status(200).json(topUsers);
    } catch (error) {
        next(error);
    }
}