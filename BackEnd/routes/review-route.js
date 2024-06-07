const express = require("express");
const router = express.Router({mergeParams : true});
const authMiddleware = require('../middleware/authMiddleware');
const revOwner = require("../middleware/isReviewOwner");
const RC = require("../controller/review-controller");

router.get("/:id/showreview" , authMiddleware ,RC.showProbReviews);
router.get("/solutions/:solId/showreview" ,authMiddleware , RC.addSolReview);
router.post("/:id/addreview" , authMiddleware ,RC.addProbReview);
router.post("/solutions/:solId/addreview" , authMiddleware , RC.addSolReview);
router.delete("/:id/:revId" , authMiddleware , revOwner , RC.destroyProbReview);
router.put("/:id/:revId" , authMiddleware , revOwner , RC.updateProbReview);
router.delete("/solutions/:solId/:revId" , authMiddleware , revOwner, RC.destroySolReview);
router.put("/solutions/:solId/:revId" , authMiddleware , revOwner, RC.updateProbReview);

module.exports = router;