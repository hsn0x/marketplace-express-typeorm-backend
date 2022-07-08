import { Router } from "express";
import {
    createLike,
    deleteLike,
    getLikeById,
    getLikes,
    updateLike,
} from "../controllers/Like.js";
import { isAuth } from "../middleware/Auth.js";
import { isLikeExist, isLikeOwner } from "../middleware/Like.js";

const router = Router();

router.get("/", getLikes);
router.get("/:id", getLikeById);
router.post("/", isAuth, createLike);
router.put("/", isAuth, updateLike);
router.delete("/:id", isAuth, isLikeOwner, deleteLike);

export default router;
