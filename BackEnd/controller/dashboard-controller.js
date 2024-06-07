const Problem = require("../models/problem-model");

module.exports.showAllPublicProblem = async(req,res,next)=>{
    try {
        let allProblems = await Problem.find({choice : "public"});
        res.status(200).json(allProblems);
    } catch (error) {
        next(error);
    }
}