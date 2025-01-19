import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { JWT_SECRET, port } from "./config/AppConfiguration.js"
import { UserModel } from "./model/userModel.js"
import { connectToDb } from "./database/connectToDb.js"
import Jwt from 'jsonwebtoken'
import { authMiddleware } from "./middleware/auth.middleware.js"
import { contentModel } from "./model/contentModel.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/api/v1/auth/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message:"User signed up"
        })
    } catch (error) {
        console.log("Already created")
        res.json({
            message: "User already exists"
        })
    }

})

app.post("/api/v1/auth/signin",async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    })
    if(existingUser){
        const token = Jwt.sign({
            // @ts-ignore
            id:existingUser._id
        },JWT_SECRET)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Please check credentials"
        })
    }
})

app.post("/api/v1/content", authMiddleware ,async (req, res) => {
    const link = req.body.link
    const title = req.body.title
    await contentModel.create({
        link,
        title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", authMiddleware ,async (req, res) => {
    const userId = req.body.userId
    const contentData = await contentModel.find({
        // @ts-ignore
        userId : userId
    }).populate("userId", "username")
    res.json({
        content : contentData,
        message : "Content fetched sucessfully"
    })
})

app.delete("/api/v1/content", authMiddleware ,async (req, res) => {
    const userId = req.body.userId
    const contentId = req.body.contentId
    const contentData = await contentModel.deleteOne({
        // @ts-ignore
        contentId : contentId,
        userId : userId
    })
    res.json({
        message : "Content deleted sucessfully"
    })
})

app.get("/api/v1/brain", (req, res) => {
    res.send("Hello World")
})

app.get("/api/v1/brain/:shareLink", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    connectToDb()
    console.log(`Server is running on port ${port}`)
    console.log("Brainly working fine")
})