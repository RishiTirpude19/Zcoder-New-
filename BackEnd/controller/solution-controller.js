const User = require("../models/user-model");
const Problem = require("../models/problem-model");
const Solution = require("../models/solution-model");
const { errorHandeler } = require("../utils/error");
const Review = require("../models/review-model");

module.exports.addSolution = async(req,res,next)=>{
    let user = await User.findById(req.user._id);
    let problem = await Problem.findById(req.params.id);
    let {description , code} = req.body;
    let newSolution = new Solution ({
        description,
        code,
    })
    await newSolution.save();
    user.solutions.push(newSolution._id);
    problem.solutions.push(newSolution._id);
    await user.save();
    await problem.save();
    res.status(200).json(newSolution);
}

module.exports.updateSolution = async (req,res,next)=>{
    try {
        let solution = await Solution.findByIdAndUpdate(req.params.solId , {
            description,
            code,
        } , {new : true});
        if(!solution){
            return next(errorHandeler(404 , "Bad request"))
        }
        res.status(200).json(solution);
    } catch (error) {
        next(error)
    }
}

module.exports.destroySolution = async (req,res,next)=>{
    try {
        let solution = await Solution.findById(req.params.solId);
        if(!solution){
            return next(errorHandeler(404 , "Bad request"));
        }
        await User.findByIdAndUpdate(req.user._id , {$pull : {solutions : req.params.solId}});
        await Problem.findByIdAndUpdate(req.params.id , {$pull : {solutions : req.params.solId}});
        for(rev of solution.reviews){
            await Review.findByIdAndDelete(rev._id);
        }
        await Solution.findByIdAndDelete(req.params.solId);
        res.status(200).json({message : "Solution Deleted successfully"});       
    } catch (error) {
        next(error);
    }
}

module.exports.showSolution = async (req,res,next)=>{
    try {
        let solution = await Solution.findById(req.params.solId).populate("problem").populate("user");
        if(!solution){
            return next(errorHandeler(400 , "Solution not found"))
        }
        res.status(200).json(solution);
    } catch (error) {
        next(error)
    }
}

module.exports.showAllSolutions = async(req,res,next)=>{
    try {
        let problem = await Problem.findById(req.params.id).populate("solutions");
        let allSolutions = problem.solutions;
        res.status(200).json(allSolutions);
    } catch (error) {
        next(error);
    }
}

//ADD REVIEW