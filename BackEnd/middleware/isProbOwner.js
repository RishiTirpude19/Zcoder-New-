const Problem = require("../models/problem-model");

module.exports = async (req,res,next)=>{
    let id = req.params.id;
    let problem = await Problem.findById(id);
    if(!problem.user._id.equals(req.user._id)){
        return next(errorHandeler(404 , "You are not the Owner of this problem"))
    }
    next()
}