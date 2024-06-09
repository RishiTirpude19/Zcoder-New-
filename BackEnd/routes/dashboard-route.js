const express = require("express");
const router = express.Router({mergeParams : true});
const authMiddleware = require("../middleware/authMiddleware");
const DC = require("../controller/dashboard-controller");

router.get("/" , authMiddleware,DC.showAllPublicProblem);

module.exports = router;