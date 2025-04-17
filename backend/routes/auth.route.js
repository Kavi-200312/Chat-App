
import express from "express"
import { checkAuth, login, logout, signup, UpdateProfile } from "../controllers/auth.controllers.js"
import { ProtectRoute  } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/signup" ,signup)
router.post("/login" ,login)
router.post("/logout" ,logout)
router.put("/update-profile" ,ProtectRoute  , UpdateProfile)
router.get("/check" , ProtectRoute  ,checkAuth)

export default router