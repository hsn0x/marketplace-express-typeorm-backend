import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/Product.js";
import { isAuth } from "../middleware/Auth.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", isAuth, createProduct);
router.put("/:id", isAuth, updateProduct);
router.delete("/:id", isAuth, deleteProduct);

export default router;
