// const mongoose=require("mongoose");
import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
   
},{timestamps:true});
 const Product=mongoose.model("Product",productSchema);
 export {Product}
