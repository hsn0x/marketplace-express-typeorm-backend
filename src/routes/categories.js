import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
    updateCategory,
    getCategoryByName,
    getCategoriesByType,
} from "../controllers/Category.js";
import { isAdmin, isAuth } from "../middleware/Auth.js";
import {
    isCategoryExist,
    isCategoryNameExist,
} from "../middleware/Category.js";

const router = Router();

router.get("/", getCategories);
router.get("/type/:type", getCategoriesByType);
router.get("/name/:name", isCategoryNameExist, getCategoryByName);
router.get("/:id", isCategoryExist, getCategoryById);
router.post("/", isAuth, isAdmin, createCategory);
router.put("/:id", isAuth, isAdmin, isCategoryExist, updateCategory);
router.delete("/:id", isAuth, isAdmin, deleteCategory);

export default router;
