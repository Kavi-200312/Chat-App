
import express from "express"
import { ProtectRoute  } from "../middleware/auth.middleware.js"
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js"
const messageRouter = express.Router()

messageRouter.get("/users" , ProtectRoute  ,getUsersForSidebar)
// messageRouter.get("/:id" , ProtectRoute  ,getMessages)
// messageRouter.post("/send/:id" , ProtectRoute  ,sendMessage)
export default messageRouter