import { Router } from "express";
import {
    createMarket,
    deleteMarket,
    getMarketById,
    getMarkets,
    updateMarket,
} from "../controllers/Market.js";
import { isAuth } from "../middleware/Auth.js";

const router = Router();

router.get("/", getMarkets);
router.get("/:id", getMarketById);
router.post("/", isAuth, createMarket);
router.put("/:id", isAuth, updateMarket);
router.delete("/:id", isAuth, deleteMarket);

export default router;
