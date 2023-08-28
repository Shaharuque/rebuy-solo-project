import { RequestHandler } from "express"


export const addBid:RequestHandler=async(req,res)=>{
    try{

    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}