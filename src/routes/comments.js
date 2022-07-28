import { Router } from "express"
import { CommentController } from "../controllers/index.js"
import { AuthMiddleware, CommentMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getAll)
router.get("/:id", getById)
router.get("/q/:query", getAllBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, createComment)
router.put("/:id", isAuth, isOwner, updateComment)
router.delete("/:id", isAuth, isOwner, deleteComment)

export default router
