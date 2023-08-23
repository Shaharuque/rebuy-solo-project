import { login, register } from "../controller/auth";
import express from "express";
const router=express.Router()

router.post('/login',login)
router.post('/register',register)

export default router