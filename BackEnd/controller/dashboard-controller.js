const Problem = require("../models/problem-model");

module.exports.showAllPublicProblem = async(req,res,next)=>{
    try {
        let allProblems = await Problem.find({choice : "public"}).populate("user");
        res.status(200).json(allProblems);
    } catch (error) {
        next(error);
    }
}