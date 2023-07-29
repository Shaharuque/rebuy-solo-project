import { login, register } from "../controller/auth";
import express from "express";
const router=express.Router()

router.get('/login',login)
router.post('/register',register)

export default router