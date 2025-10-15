const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const { index, renderNewForm, showListing, createListing, renderEditForm, deleteListing, updateListing } = require("../controller/listing.js");

// ---index route-------
router.get("/" ,wrapAsync(index));

//New route
router.get("/new",isLoggedIn ,wrapAsync(renderNewForm));

// Show route
router.get("/:id",wrapAsync(showListing));

// create route
router.post("/",isLoggedIn, validateListing, wrapAsync(createListing));

// edit route
router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(renderEditForm));

// update route
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(updateListing));

// delete route
router.delete("/:id",isLoggedIn ,isOwner, wrapAsync(deleteListing));


module.exports = router;