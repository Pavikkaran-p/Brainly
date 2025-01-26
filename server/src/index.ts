import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { JWT_SECRET, port } from "./config/AppConfiguration.js"
import { UserModel } from "./model/userModel.js"
import { connectToDb } from "./database/connectToDb.js"
import Jwt from 'jsonwebtoken'
import { authMiddleware } from "./middleware/auth.middleware.js"
import { contentModel } from "./model/contentModel.js"
import { LinkModel } from "./model/linkModel.js"
import { random } from "./utils.js"
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
    const type = req.body.type
    if(!link || !type){
        res.sendStatus(409)
    }
    await contentModel.create({
        link,
        type,
        // @ts-ignore
        userId: req.userId,
        tags: []
    }).then(data =>
        res.json({
            message: "Content added"
        })
    ).catch(error => {
        console.log(error)
        res.status(405).send("Unable to post content")
    })
    
})

app.get("/api/v1/content", authMiddleware ,async (req, res) => {
    // @ts-ignore
    const userId = req.userId
    console.log(userId,"Id")

    const contentData = await contentModel.find({
        // @ts-ignore
        userId : userId
    }).populate("userId", "username")
    .catch(error=>{
        console.log(error)
        res.sendStatus(404)
    })
    res.json({
        content : contentData,
        message : "Content fetched sucessfully"
    })
})

app.delete("/api/v1/content", authMiddleware ,async (req, res) => {
    const userId = req.body.userId
    const contentId = req.body.contentId
    if(!userId || !contentId)  res.status(404).send("Invalid UserId or contentId")
    const contentData = await contentModel.deleteOne({
        // @ts-ignore
        contentId : contentId,
        userId : userId
    }).catch(error=> {
        console.log(error)
        res.status(400).send("Something went wrong")
    })
    res.json({
        message : "Content deleted sucessfully"
    })
})

app.post("/api/v1/brain/share",authMiddleware,async (req, res) => {
    const share = req.body.share;
    if(share){
        try {
            const existing_link = await LinkModel.findOne({
                // @ts-ignore
                userId: req.userId
            })
            if(existing_link){
                res.json({
                    hash:"/api/v1/share/" + existing_link.hash,
                    message: "Updated sharable link"
                })
                return
            }

            const sharable_link = await LinkModel.create({
                // @ts-ignore
                userId:req.userId,
                hash:random(10),
            })
            res.json({
                hash: "/api/v1/share/" + sharable_link.hash,
                message: "Updated sharable link"
            })
        } catch (error) {
            console.log(error)
            res.status(400).send("Something went wrong")
        }
    }
    else{
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Link sharing disabled"
        })
    }
})

app.get("/api/v1/brain/:shareLink",async (req, res) => {
    try {
        const hash = req.params.shareLink
        console.log(hash)
        const link = await LinkModel.findOne({
            // @ts-ignore
            hash
        })
        console.log("Link",link)
        if(!link){
            res.status(411).json({
                message: "Sorry incorrect input"
            })
            return
        }
        const content = await contentModel.find({
            userId:link.userId
        })
        console.log("Content",content)
        const user = await UserModel.findOne({
            _id: link.userId.toString()
        })
        console.log("user",user)
        if(!user){
            res.status(411).json({
                message: "user doesn't exist"
            })
            return
        } 
        res.status(200).json({
            username:user?.username,
            content: content
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("Something went wrong")
    }
})

app.listen(port, () => {
    connectToDb()
    console.log(`Server is running on port ${port}`)
    console.log("Brainly working fine")
})