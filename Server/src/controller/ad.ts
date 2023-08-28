import { RequestHandler } from "express";


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
