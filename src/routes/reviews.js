import { Router } from "express"
import {
    createReview,
    deleteReview,
    getById,
    getByName,
    getReviews,
    getReviewsBySearch,
    updateReview,
} from "../controllers/Review.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner, isReviewUsernameTaken } from "../middleware/Review.js"

const router = Router()

router.get("/", getReviews)
router.get("/:id", getById)
router.get("/q/:query", getReviewsBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, createReview)
router.put("/:id", isAuth, isOwner, updateReview)
router.delete("/:id", isAuth, isOwner, deleteReview)

export default router
