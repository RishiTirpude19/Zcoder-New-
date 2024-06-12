const express = require("express");

const router = express.Router({mergeParams : true});
const PC = require("../controller/problem-controller");
const authMiddleware = require('../middleware/authMiddleware');
const isProbOwner = require('../middleware/isProbOwner');

router.post("/addproblem" , authMiddleware,  PC.addProblem);
router.delete("/:id" , authMiddleware ,isProbOwner, PC.destroyProblem);
router.put("/:id" ,authMiddleware , isProbOwner, PC.updateProblem);
router.get("/:id" , authMiddleware , PC.showProblem); //FRONTEND CREATED
router.post("/:id/addbookmark" , authMiddleware , PC.addBookMark);
module.exports = router;