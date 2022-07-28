import { Router } from "express"
import { CommentController } from "../controllers/index.js"
import { AuthMiddleware, CommentMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", CommentController.getAll)
router.post("/", AuthMiddleware.isAuth, CommentController.create)

router.get("/q/:query", CommentController.getAllBySearch)
router.get("/name/:slug", CommentController.getByName)

router.get("/:id", CommentController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    CommentMiddleware.isOwner,
    CommentController.remove
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    CommentMiddleware.isOwner,
    CommentController.remove
)

export default router
