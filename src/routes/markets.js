import { Router } from "express";
import {
    create,
    remove,
    getMarketById,
    getMarketByName,
    getMarkets,
    getMarketsBySearch,
    update,
} from "../controllers/Market.js";
import { isAuth } from "../middleware/Auth.js";
import { isMarketOwner, isMarketUsernameTaken } from "../middleware/Market.js";

const router = Router();

router.get("/", getMarkets);
router.get("/:id", getMarketById);
router.get("/q/:query", getMarketsBySearch);
router.get("/name/:slug", getMarketByName);
router.post("/", isAuth, isMarketUsernameTaken, create);
router.put("/:id", isAuth, isMarketUsernameTaken, isMarketOwner, update);
router.delete("/:id", isAuth, isMarketOwner, remove);

export default router;
