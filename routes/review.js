const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const wrapAsyc = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const { isLoggedIn, isAuthor ,validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Post Route
router.post("/" , isLoggedIn , validateReview ,  wrapAsyc (reviewController.createReview));

//Delete Route
router.delete("/:reviewId" , isLoggedIn  , isAuthor, wrapAsyc (reviewController.destroyReview));

module.exports = router;