import express from "express";
import { verifyToken } from "../utils/verifyToken";
import { createInstaUser, followUser, getSuggestions } from "../controller/instaUser";
import { createPost, getPosts } from "../controller/instaPost";



const router=express.Router()

router.post('/new/user',createInstaUser)
router.get('/suggestions',getSuggestions)
router.post('/follow',followUser)

//for posts
router.post('/new/post',createPost)
router.get('/posts/:loggedInUserId',getPosts)


export default router