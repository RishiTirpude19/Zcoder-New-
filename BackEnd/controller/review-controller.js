const Review = require("../models/review-model");
const Solution = require("../models/solution-model");
const Problem = require("../models/problem-model");
const {errorHandeler} = require("../utils/error");

module.exports.addProbReview = async(req,res , next)=>{
    try {
        const problem = await Problem.findById(req.params.id);
        if(!problem){
            return next(errorHandeler(400 , "Problem not found"));
        }
        let {rating , comment} = req.body;
        let newReview = new Review({
            rating,
            comment,
        })   
        newReview.user = req.user._id;
        await newReview.save();
        problem.reviews.push(newReview._id);
        await problem.save();
        res.status(200).json(newReview);
    } catch (error) {
        next(error);
    }
}
module.exports.addSolReview = async (req,res,next)=>{
    try {
        const solution = await Solution.findById(req.params.solId);
        if(!solution){
            return next(errorHandeler(400 , "Solution not found"));
        }
        let {rating , comment} = req.body;
        let newReview = new Review({
            rating,
            comment,
        })   
        newReview.user = req.user._id;
        await newReview.save();
        solution.reviews.push(newReview._id);
        await solution.save();
        res.status(200).json(newReview);
    } catch (error) {
        next(error);
    }
}
module.exports.destroyProbReview = async (req ,res ,next)=>{
    try {
        await Problem.findByIdAndUpdate(req.params.id , {$pull :{reviews : req.params.revId}});
        await Review.findByIdAndDelete(req.params.revId);
    } catch (error) {
        next(error);
    }
}
module.exports.destroySolReview = async (req ,res ,next)=>{
    try {
        await Solution.findByIdAndUpdate(req.params.solId , {$pull :{reviews : req.params.revId}});
        await Review.findByIdAndDelete(req.params.revId);
    } catch (error) {
        next(error);
    }
}
module.exports.showProbReviews = async(req,res,next)=>{
    try {
        let problem = await Problem.findById(req.params.id).populate("reviews");
        let allReviews = problem.reviews;
        res.status(200).json(allReviews);
    } catch (error) {
        next(error);
    }
}
module.exports.showSolReviews = async(req,res,next)=>{
    try {
        let solution = await Solution.findById(req.params.solId).populate("reviews");
        let allReviews = solution.reviews;
        res.status(200).json(allReviews);
    } catch (error) {
        next(error);
    }
}
module.exports.updateProbReview = async (req,res,next)=>{
    try {       
        const review  = await Review.findByIdAndUpdate(req.params.revId , {
            rating,
            comment,
        } ,{new : true});
        if(!review){
            return next(errorHandeler(404 , "Bad request"))
        };
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
}
