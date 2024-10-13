import {User}from "../schema-model/register.js"
import {Cart}from "../schema-model/cart.js"
import { Product } from "../schema-model/products.js";

export const insertUsers=async (req,resp)=>{
    if(!req.body.email){
        resp.status(400).send({message:"name is required"})
    }
    const userData=new User(req.body);
    userData.save();
    resp.status(201).json({message:"user inserted"})
}

export const checkLogin=async (req, resp)=>{
    const {email,password}=req.body;
    const ret=await User.findOne({email,password})
    if(!ret){
       return resp.status(401).json({message:"email or password is incorrect"})
    }
    resp.status(200).json({message:"login successfully"});
}

export const getUserCart=async (req, res)=>{
    const userId= req.params.userId;
    const resp =await Cart.find({userId}).populate({path: "productId"});
     res.status(200).json(resp);
 }

 export const addCart=async (req, res)=>{
    const { productId, quantity } = req.body;
    const {userId} = req.params;
    try {
        // Check if item already exists in the cart
        const existingCartItem = await Cart.findOne({ userId, productId });
        if (existingCartItem) {
            // Update quantity if it exists
            existingCartItem.quantity += quantity;
            const updatedCartItem = await existingCartItem.save();
            return res.status(200).json(updatedCartItem);
        }

        const newCart = new Cart({ userId, productId, quantity });
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

 export const updateCart=async (req,res)=>{
    const { cartId } = req.params;
    const { quantity } = req.body;

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate({_id: cartId}, { quantity }, { new: true });
        if (!updatedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 export const deleteCart=async (req,res)=>{
    const { cartId } = req.params;

    try {
        const deletedCartItem = await Cart.findByIdAndDelete({_id: cartId});
        if (!deletedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}