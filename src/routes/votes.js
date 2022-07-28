import { Router } from "express"
import { VoteController } from "../controllers/index.js"
import { AuthMiddleware, VoteMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getVotes)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.put("/", isAuth, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
