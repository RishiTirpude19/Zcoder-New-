const User = require("../models/user-model");
const Problem = require("../models/problem-model");
const Solution = require("../models/solution-model");
const {errorHandeler} = require("../utils/error");
const Review = require("../models/review-model");

module.exports.addProblem = async (req,res,next)=>{
    try {
        const { title, problemstatement, choice, platform, link } = req.body;

        const problem = new Problem({
            title,
            problemstatement,
            choice,
            platform,
            link,
            user: req.user._id, 
        });

        await problem.save();

        const user = await User.findById(req.user._id);
        user.problems.push(problem._id);
        await user.save();

        res.status(201).json({ message: 'Problem added successfully', problem });
    } catch (error) {
        next(error);
    }
}

module.exports.destroyProblem = async (req, res, next) => {
    try {
        let problemId = req.params.id;
        let userId = req.user._id;
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        if (problem.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this problem' });
        }
        await User.findByIdAndUpdate(userId, { $pull: { problems: problemId } });
        for(let sol of problem.solutions){
            await Solution.findByIdAndDelete(sol._id);
        };
        for(let rev of problem.reviews){
            await Review.findByIdAndDelete(rev._id);
        };
        await Problem.findByIdAndDelete(problemId);
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports.updateProblem = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const { title, problemstatement, platform, link, choice } = req.body;
        const problem = await Problem.findByIdAndUpdate(
            id,
            {
                title: title,
                problemstatement: problemstatement,
                platform: platform,
                link: link,
                choice: choice,
            },
            { new: true }
        );        
        if (!problem) {
            return res.status(404).send("Problem not found.");
        }        
        res.status(200).json(problem);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
module.exports.showProblem = async (req,res ,next)=>{
    try {
        let id = req.params.id;
        let problem = await Problem.findById(id).populate("solutions").populate("user");
        res.status(200).json(problem);
    } catch (error) {
        next(error);
    }
}

module.exports.addBookMark = async (req,res,next)=>{
    try {
        let problemid = req.params.id;
        let problem = await Problem.findById(problemid);
        if(!problem){
            return next(errorHandeler(404 , "Bad Request"))
        }
        let user = await User.findById(req.user._id);
        user.otherBookMarkedProblems.push(problemid);
        res.status(200).json("Bookmarked Problems updtaed");
    } catch (error) {
        next(error)
    }
}

//ADD REVIEWs