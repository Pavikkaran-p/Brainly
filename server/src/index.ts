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
import authRoutes from "./routes/auth.routes.js";
import { asyncHandler } from "./utils/asyncHandler.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/v1/auth", authRoutes)

app.post("/api/v1/content", authMiddleware ,async (req:any, res:any) => {
    const link = req.body.link
    const type = req.body.type
    const title = req.body.title
    if (!link || !type) {
        return res.sendStatus(409);
    }
    await contentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    }).then(data =>
        res.json({
            message: "Content added successfully"
        })
    ).catch(error => {
        console.log(error)
        res.status(405).send("Unable to post content")
    })
    
})

app.get("/api/v1/content",authMiddleware, asyncHandler(async (req, res) => {
    const userId = req.userId;

    const contentData = await contentModel
      .find({ userId })
      .populate("userId", "username");

    res.json({
      content: contentData,
      message: "Content fetched successfully",
    });
  })
);

app.delete("/api/v1/content/:contentId", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const contentId = req.params.contentId;

        if (!contentId) {
            res.status(400).json({
                message: "ContentId is required"
            });
            return;
        }

        const deleted = await contentModel.deleteOne({
            _id: contentId,
            userId: userId
        });

        if (deleted.deletedCount === 0) {
            res.status(403).json({
                message: "Not allowed or content not found"
            });
            return;
        }

        res.json({
            message: "Content deleted successfully"
        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
        return;
    }
});

app.post("/api/v1/brain/share",authMiddleware,async (req, res) => {
    const share = req.body.share;
    if(share){
        try {
            const existing_link = await LinkModel.findOne({
                userId: req.userId
            })
            if(existing_link){
                res.json({
                    hash:"/share/" + existing_link.hash,
                    message: "Updated sharable link"
                })
                return
            }

            const sharable_link = await LinkModel.create({
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

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.error("DB connection failed", err);
  }
};

startServer();