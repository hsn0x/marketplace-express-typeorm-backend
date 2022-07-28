import { Router } from "express"
import { LikeController } from "../controllers/index.js"
import { AuthMiddleware, LikeMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", LikeController.getAll)
router.post("/", AuthMiddleware.isAuth, LikeController.create)

router.get("/:id", LikeController.getById)
router.put("/:id", AuthMiddleware.isAuth, LikeController.update)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    LikeMiddleware.isOwner,
    LikeController.remove
)

export default router
