import { Router } from "express";
import {
    createMarket,
    deleteMarket,
    getMarketById,
    getMarkets,
    updateMarket,
} from "../controllers/Market.js";
import { isAuth } from "../middleware/Auth.js";
import { isMarketOwner, isMarketUsernameTaken } from "../middleware/Market.js";

const router = Router();

router.get("/", getMarkets);
router.get("/:id", getMarketById);
router.post("/", isAuth, isMarketUsernameTaken, isMarketOwner, createMarket);
router.put("/:id", isAuth, isMarketUsernameTaken, isMarketOwner, updateMarket);
router.delete("/:id", isAuth, isMarketOwner, deleteMarket);

export default router;
