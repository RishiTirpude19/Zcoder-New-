const express = require("express");
const router = express.Router({mergeParams : true});
const UC = require("../controller/user-controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/" , authMiddleware , UC.showUser);
router.get("/myproblems" , authMiddleware , UC.showMyProblems);//working
router.get("/bookmarkedproblems" , authMiddleware , UC.myBookmarkedProblems);
router.put("/updateprofile" , authMiddleware , UC.updateProfile);

module.exports = router
