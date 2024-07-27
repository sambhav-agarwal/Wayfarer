const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsyc = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})



router
    .route("/")
    .get(wrapAsyc(listingController.index))
    .post( isLoggedIn, upload.single('listing[image]')  ,validateListing,  wrapAsyc(listingController.createListing));
  

    
router.get("/new" , isLoggedIn ,listingController.renderNewForm)

router
    .route("/:id")
    .get(wrapAsyc(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]') , validateListing, wrapAsyc(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsyc(listingController.deletedListing));
    
router.get("/:id/edit" , isLoggedIn ,isOwner , wrapAsyc(listingController.renderEditForm));


module.exports = router;