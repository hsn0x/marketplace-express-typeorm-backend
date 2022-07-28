import { Router } from "express"
import { FavoriteController } from "../controllers/index.js"
import { AuthMiddleware, FavoriteMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.put("/", isAuth, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
