import { Router } from "express"
import {
    create,
    remove,
    getById,
    getLikes,
    update,
} from "../controllers/Like.js"
import { isAuth } from "../middleware/Auth.js"
import { isLikeExist, isLikeOwner } from "../middleware/Like.js"

const router = Router()

router.get("/", getLikes)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.put("/", isAuth, update)
router.delete("/:id", isAuth, isLikeOwner, remove)

export default router
