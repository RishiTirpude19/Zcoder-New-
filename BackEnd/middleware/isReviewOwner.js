
const Review = require("../models/review-model");

module.exports = async (req,res,next)=>{
    let revId = req.params.revId;
    let review = await Review.findById(revId);
    if(!review.user._id.equals(req.user._id)){
        return next(errorHandeler(404 , "You are not the Owner of this review"))
    }
    next()
}