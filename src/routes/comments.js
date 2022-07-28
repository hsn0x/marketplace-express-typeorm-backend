import { Router } from "express"
import {
    createComment,
    deleteComment,
    getById,
    getByName,
    getComments,
    getCommentsBySearch,
    updateComment,
} from "../controllers/Comment.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner, isCommentUsernameTaken } from "../middleware/Comment.js"

const router = Router()

router.get("/", getComments)
router.get("/:id", getById)
router.get("/q/:query", getCommentsBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, createComment)
router.put("/:id", isAuth, isOwner, updateComment)
router.delete("/:id", isAuth, isOwner, deleteComment)

export default router
