import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/Product.js";

import multer from "multer";
const multerUpload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", multerUpload.any(), getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
