const express = require("express");
const router = express.Router({mergeParams : true});
const authMiddleware = require('../middleware/authMiddleware');
const isSolOwner = require("../middleware/isSolOwner");

const SC = require("../controller/solution-controller");

router.post("/addsolution" , authMiddleware, SC.addSolution);
router.get("/solutions" , authMiddleware, SC.showAllSolutions);
router.get("/solutions/:solId" , authMiddleware , SC.showSolution);
router.post("/solutions", authMiddleware , SC.addSolution);
router.put("/solution/:solId" , authMiddleware ,isSolOwner,SC.updateSolution);
router.delete("/solution/:solId", authMiddleware,isSolOwner,SC.destroySolution);
//review route
module.exports = router;