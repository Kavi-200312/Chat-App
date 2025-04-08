
import express from "express"
import { ProectRoute } from "../middleware/auth.middleware.js"
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js"
const messageRouter = express.Router()

messageRouter.get("/users" , ProectRoute ,getUsersForSidebar)
messageRouter.get("/:id" , ProectRoute ,getMessages)
messageRouter.post("/send/:id" , ProectRoute ,sendMessage)
export default messageRouter