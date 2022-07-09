import { Router } from "express";
import {
    createReview,
    deleteReview,
    getReviewById,
    getReviewByName,
    getReviews,
    getReviewsBySearch,
    updateReview,
} from "../controllers/Review.js";
import { isAuth } from "../middleware/Auth.js";
import { isReviewOwner, isReviewUsernameTaken } from "../middleware/Review.js";

const router = Router();

router.get("/", getReviews);
router.get("/:id", getReviewById);
router.get("/q/:query", getReviewsBySearch);
router.get("/name/:slug", getReviewByName);
router.post("/", isAuth, createReview);
router.put("/:id", isAuth, isReviewOwner, updateReview);
router.delete("/:id", isAuth, isReviewOwner, deleteReview);

export default router;
