import { Router } from "express"
import { VoteController } from "../controllers/index.js"
import { AuthMiddleware, VoteMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", VoteController.getAll)
router.post("/", AuthMiddleware.isAuth, VoteController.create)

router.get("/:id", VoteController.getById)
router.put("/:id", AuthMiddleware.isAuth, VoteController.update)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    VoteMiddleware.isOwner,
    VoteController.remove
)

export default router
