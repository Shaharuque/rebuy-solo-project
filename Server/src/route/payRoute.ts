import { payIntent, savePaymentInfo } from "../controller/pay";
import express from "express";

const router=express.Router()

router.post("/create-payment-intent",payIntent)
router.post("/info/add/to/db",savePaymentInfo)



export default router