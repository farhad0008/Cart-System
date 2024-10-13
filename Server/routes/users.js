import express from "express";
import {checkLogin, insertUsers,getUserCart, addCart, updateCart, deleteCart} from '../controllers/users.js'

const userRoutes = express.Router();

userRoutes.post("/",insertUsers);
userRoutes.post("/login",checkLogin);

userRoutes.get("/:userId/cart",getUserCart);
userRoutes.post("/:userId/add-cart", addCart);
userRoutes.put("/update-cart/:cartId", updateCart);
userRoutes.delete("/delete-cart/:cartId", deleteCart);

export {userRoutes}