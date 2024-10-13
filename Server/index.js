// const express = require("express");
// const cors = require("cors");
// const mongoose=require('mongoose');
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { initRoutes } from "./routes/index.js";

const app=express();
app.use(express.json());
app.use(cors());

initRoutes(app);

app.listen(3000,()=>{
    console.log("Server Started...");
    
    mongoose.connect("mongodb://127.0.0.1:27017/Cartdb").then(()=>{
        console.log("DataBase Connected...");
        
    })
})