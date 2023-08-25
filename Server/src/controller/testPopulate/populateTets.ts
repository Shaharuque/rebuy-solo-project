import { RequestHandler } from "express";
import StaffModel from "../../model/testPopulate/Staff";
import RightModel from "../../model/testPopulate/Right";

export const createStaff:RequestHandler=async(req,res)=>{
    try{

        const staff=await StaffModel.create({
            name:req.body.name,
            email:req.body.email
        })
        const result=await staff.save()
        res.status(200).json(result)
    
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}

export const createRight:RequestHandler=async(req,res)=>{
    try{
        const right=await RightModel.create({
            staff_id:req.body.staff_id,
            right:req.body.right
        })
        const result=await right.save()
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}

//now i want to retrive right with their staff details(relationship=>populate)

export const rightWithStaffDetails:RequestHandler=async(req,res)=>{
    try{
        console.log(req.body.rightId)
        const rightWithStaff=await RightModel.find({_id:req.body.rightId}).populate('staff_id','-_id')
        res.status(200).json(rightWithStaff)

    }catch(err){
        res.status(500).json(err)
    }
}


