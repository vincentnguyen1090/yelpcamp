const express = require('express')
const router = express.Router({ mergeParams: true }) //mergeParams gives access to params in app.js
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync')



// submitting a review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// deleting a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router