const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main().then(() => {
    console.log("connect successfully");
}).catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner : "653e5b2c69f458a54fdf0bdf"}));
    await Listing.insertMany(initData.data);
    console.log("data was inserted");
}

initDB();