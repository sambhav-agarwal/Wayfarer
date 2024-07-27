const mongoose = require("mongoose");
const initData =  require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Wayfarer";


main().
    then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

    async function main(){
        await mongoose.connect(MONGO_URL);
    }

    const initDb = async () =>{
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj , owner : "668ae55200fb35e69679c71f"}));
        await Listing.insertMany(initData.data);
        console.log("data was inti");
    }

   initDb(); 