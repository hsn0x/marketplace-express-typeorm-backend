import { Router } from "express"
import { LikeController } from "../controllers/index.js"
import { AuthMiddleware, LikeMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getLikes)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.put("/", isAuth, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
