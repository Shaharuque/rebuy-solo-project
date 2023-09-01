import express from "express";
import { verifyToken } from "../utils/verifyToken";
import {addToCart, getCart, checkItemOnCart, deleteItemFromCart } from "../controller/order";


const router=express.Router()

//cheack item on cart
router.post('/check',verifyToken,checkItemOnCart)
//get all items on cart for individual user(only for logged in user)
router.get('/all/items',verifyToken,getCart)
//add item to cart
router.post('/item/add',verifyToken,addToCart)
//delete item from cart
router.post('/item/delete',verifyToken,deleteItemFromCart)




export default router