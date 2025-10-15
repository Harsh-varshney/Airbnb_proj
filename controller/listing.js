const Listing = require("../models/listing.js");

module.exports.index =  async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
};

module.exports.renderNewForm = async(req,res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews",populate : {path: "author"}}).populate("owner");
    // console.log(listing);
    if(!listing){//for flash msg
        req.flash("error","listing you requested for does not exists!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req,res,next) => {
    let newListing = new Listing(req.body.listing);
    // console.log(req.user);
    newListing.owner = req.user._id;
    console.log(newListing);
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    req.flash("success","listing edit successfully");
    if(!listing){//for error flash msg
        req.flash("error","listing you requested for does not exists!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req,res) => {
    let { id } = req.params;
    // let {title,image,description,price,location,country} = req.body;
    // let listing = {title,image,description,price,location,country};
    // await Listing.findByIdAndUpdate(id, {...listing});

    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    req.flash("success","listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);  
    console.log(deleteListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};