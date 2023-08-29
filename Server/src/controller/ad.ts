import { RequestHandler } from "express";
import Ad from "../model/Ad";


export const postAd:RequestHandler=async(req,res)=>{
    try{
        const {type,status,title,brand,description,model,category,price,images}=req.body;
        const ad=await Ad.create({
            owner:req.user.id,
            category:category,
            choosenType:type,
            productName:title,
            brand,
            model,
            description,
            images,
            productStatus:status,
            basePrice:price,
            
        })
        res.status(201).json({
            message:"ad created",
            ad
        })
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}

export const getAllAd:RequestHandler=async(req,res)=>{
    try{  
    
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}

export const getUserAds:RequestHandler=async(req,res)=>{
    try{  
    
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}

export const getSoldProducts:RequestHandler=async(req,res)=>{
    try{  
    
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}
