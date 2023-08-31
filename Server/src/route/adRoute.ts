import express from "express";
import { verifyToken } from "../utils/verifyToken";
import { getAllAd, getUserAds,getSoldProducts, postAd, adDetails, newAds,addToCart, getCart } from "../controller/ad";


const router=express.Router()

router.post('/add',verifyToken,postAd)
router.get('/get/all/ad',verifyToken,getAllAd)
router.get('/get/ad/details/:id',verifyToken,adDetails)
router.get('/get/recent/ads',verifyToken,newAds)
router.get('/get/user/posted/ads/:userId',verifyToken,getUserAds)
//get all the user products which are sold
router.get('/get/user/ad',getSoldProducts)
//add item to cart
router.post('/cart',verifyToken,getCart)
router.post('/add/to/cart',verifyToken,addToCart)
router.delete('/delete/from/cart',verifyToken,addToCart)




export default router