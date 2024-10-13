import mongoose, { Schema } from "mongoose";

const cartSchema=mongoose.Schema({
    userId: {type:Schema.ObjectId,ref:"User"},
    productId: {type:Schema.ObjectId, ref: "Product"},
    quantity: {type: Number, default: 0}

},{timestamps:true});

 const Cart=mongoose.model("Cart",cartSchema);
 export {Cart}


