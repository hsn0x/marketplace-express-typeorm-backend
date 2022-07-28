import { Router } from "express"
import { AuthController } from "../controllers/index.js"
import { AuthMiddleware } from "../middleware/index.js"

const router = Router()

router.post("/login", isGuest, login)
router.get("/me", isAuth, profile)

router.post("/register", isGuest, isEmailExist, isUsernameTaken, register)

router.get("/login/failure", isGuest, (req, res, next) => {
    return res.status(401).json({
        message: "Invalid username or password",
    })
})
router.get("/login/success", isAuth, (req, res, next) => {
    return res.status(200).json({
        message: "Login successful",
    })
})

router.get("/logout", logout, logoutSession)

export default router
