import express from "express";
import { verifyToken } from "../utils/verifyToken";
import { addBid } from "../controller/bid";



const router=express.Router()

router.post('/add',verifyToken,addBid)

export default router
