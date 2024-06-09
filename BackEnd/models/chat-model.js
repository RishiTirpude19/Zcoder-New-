const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    problem : {
        type : Schema.Types.ObjectId,
        ref : "Problem"
    },
    solution : {
        type : Schema.Types.ObjectId,
        ref : "Solution" 
    },
    users : [
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    latestmessage : {
        type : Schema.Types.ObjectId,
        ref : "Message"
    },
    ChatAdmin : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
}, {timestamps:true});

const Chat = mongoose.model("Chat" , chatSchema);
module.exports = Chat;