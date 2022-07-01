import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
    updateCategory,
    getCategoryByName,
} from "../controllers/Category.js";
import { isAdmin, isAuth } from "../middleware/Auth.js";
import {
    isCategoryExist,
    isCategoryNameExist,
} from "../middleware/Category.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id", isCategoryExist, getCategoryById);
router.get("/:id", isCategoryNameExist, getCategoryByName);
router.post("/", isAuth, isAdmin, createCategory);
router.put("/:id", isAuth, isAdmin, isCategoryExist, updateCategory);
router.delete("/:id", isAuth, isAdmin, deleteCategory);

export default router;
