import express from "express";
import { verifyToken } from "../utils/verifyToken";
import { getAllAd, getUserAds,getSoldProducts, postAd } from "../controller/ad";


const router=express.Router()

router.post('/add',verifyToken,postAd)
router.get('/get/all/ad',verifyToken,getAllAd)
router.get('/get/user/posted/ads/:userId',verifyToken,getUserAds)

//get all the user products which are sold
router.get('/get/user/ad',getSoldProducts)




export default router