const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soulutionSchema = new Schema({
    description : {
        type : String,
        required : true,
    },
    code:{
        type : String,
        required : true,
    },
    problem : {
        type : Schema.Types.ObjectId,
        ref : "Problem"
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
} , {timestamps : true})

const Solution  = mongoose.model("Solution" , soulutionSchema);
module.exports = Solution;