import { Router } from "express"
import { ReviewController } from "../controllers/index.js"
import { AuthMiddleware, ReviewMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getAll)
router.get("/:id", getById)
router.get("/q/:query", getAllBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, createReview)
router.put("/:id", isAuth, isOwner, updateReview)
router.delete("/:id", isAuth, isOwner, deleteReview)

export default router
