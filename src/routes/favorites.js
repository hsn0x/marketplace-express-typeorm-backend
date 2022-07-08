import { Router } from "express";
import {
    createFavorite,
    deleteFavorite,
    getFavoriteById,
    getFavorites,
    updateFavorite,
} from "../controllers/Favorite.js";
import { isAuth } from "../middleware/Auth.js";
import { isFavoriteExist, isFavoriteOwner } from "../middleware/Favorite.js";

const router = Router();

router.get("/", getFavorites);
router.get("/:id", getFavoriteById);
router.post("/", isAuth, createFavorite);
router.put("/", isAuth, updateFavorite);
router.delete("/:id", isAuth, isFavoriteOwner, deleteFavorite);

export default router;
