import { Router } from "express"
import { FavoriteController } from "../controllers/index.js"
import { AuthMiddleware, FavoriteMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", FavoriteController.getAll)
router.post("/", AuthMiddleware.isAuth, FavoriteController.create)

router.get("/:id", FavoriteController.getById)
router.put("/:id", AuthMiddleware.isAuth, FavoriteController.update)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    FavoriteMiddleware.isOwner,
    FavoriteController.remove
)

export default router
