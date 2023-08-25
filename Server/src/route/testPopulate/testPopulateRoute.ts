import { createRight, createStaff, rightWithStaffDetails } from "../../controller/testPopulate/populateTets";
import express from "express";

const router=express.Router()

router.post('/staff',createStaff)
router.post('/right',createRight)
router.post('/right/with/staff/details',rightWithStaffDetails)




export default router