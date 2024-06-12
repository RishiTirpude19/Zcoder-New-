const express = require("express");
const router = express.Router({mergeParams : true});
const authMiddleware = require("../middleware/authMiddleware");
const DC = require("../controller/dashboard-controller");

router.get("/" , authMiddleware,DC.showAllPublicProblem); //FRONTEND CREATED
router.get("/topusers" , authMiddleware , DC.showTopUsers); //FRONTEND CREATED
module.exports = router;