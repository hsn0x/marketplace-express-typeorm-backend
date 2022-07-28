import { Router } from "express"
import {
    create,
    remove,
    getById,
    getVotes,
    update,
} from "../controllers/Vote.js"
import { isAuth } from "../middleware/Auth.js"
import { isExist, isOwner } from "../middleware/Vote.js"

const router = Router()

router.get("/", getVotes)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.put("/", isAuth, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
