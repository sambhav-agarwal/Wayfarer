const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema , reviewSchema} = require("./schema.js");

const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next)  => {
       if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;      
        req.flash("error","User Not Logged In");
        return res.redirect("/login");
       }
       next();
}

module.exports.saveRedirectUrl = (req,res,next)  => {
       if(req.session.redirectUrl){
          res.locals.redirectUrl = req.session.redirectUrl;
       }
       next();
}

module.exports.isOwner = async (req,res,next)  => {
       let {id} = req.params;
       id = id.trim();
       let listing = await Listing.findById(id);
       if(!listing.owner._id.equals(res.locals.curUser._id)){
           req.flash("error" , "You Don't Have Permission To Do That!");
           return  res.redirect(`/listings/${id}`);
       }
       next();
}
    
module.exports.isAuthor = async (req,res,next)  => {
       let { id , reviewId} = req.params;
       id = id.trim();
       reviewId = reviewId.trim();
       let review = await Review.findById(reviewId);
       if(!review.author._id.equals(res.locals.curUser._id)){
           req.flash("error" , "You Don't Have Permission To Do That!");
           return  res.redirect(`/listings/${id}`);
       }
       next();
}
    
module.exports.validateReview = (req,res,next) => {
       let {error} = reviewSchema.validate(req.body);
       if(error){
           let errMsg = error.details.map((el) => el.message).join(",");
           throw new ExpressError(400 , errMsg);
       }else {
           next();
       }
}

module.exports.validateListing = (req,res,next) => {
       let {error} = listingSchema.validate(req.body);
       if(error){
           let errMsg = error.details.map((el) => el.message).join(",");
           throw new ExpressError(400 , errMsg);
       }else {
           next();
       }
}