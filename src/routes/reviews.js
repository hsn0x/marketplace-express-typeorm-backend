import { Router } from "express"
import { ReviewController } from "../controllers/index.js"
import { AuthMiddleware, ReviewMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", ReviewController.getAll)
router.post("/", AuthMiddleware.isAuth, ReviewController.create)

router.get("/:id", ReviewController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    ReviewMiddleware.isOwner,
    ReviewController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    ReviewMiddleware.isOwner,
    ReviewController.remove
)

export default router
