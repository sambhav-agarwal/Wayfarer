const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview = async(req,res) =>{
    let {id} = req.params;
    id = id.trim();
    let listing  = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    await newReview.save();
    listing.reviews.push(newReview._id);
    await listing.save();
    req.flash("success" , "New Review Created!");
    res.redirect(`/listings/${id}`);
}


module.exports.destroyReview = async(req,res) =>{
    let {id , reviewId} = req.params;
    id = id.trim();
    reviewId = reviewId.trim();
// console.log(id);
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review Deleted!");
    res.redirect(`/listings/${id}`);
}