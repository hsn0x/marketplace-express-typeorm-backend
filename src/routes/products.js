import { Router } from "express";
import {
    create,
    remove,
    getProductById,
    getProductsBySearch,
    getProductBySlug,
    getProducts,
    update,
    getProductsBySearchWithFilters,
} from "../controllers/Product.js";
import { isAuth } from "../middleware/Auth.js";
import { isProductOwner } from "../middleware/Product.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/title/:slug", getProductBySlug);
router.get("/q/filters/:query", getProductsBySearchWithFilters);
router.get("/q/:query", getProductsBySearch);
router.post("/", isAuth, create);
router.put("/:id", isAuth, isProductOwner, update);
router.delete("/:id", isAuth, isProductOwner, remove);

export default router;
