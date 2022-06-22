import { Router } from "express";
import {
    createMarket,
    deleteMarket,
    getMarketById,
    getMarkets,
    updateMarket,
} from "../controllers/Market.js";

import multer from "multer";
const multerUpload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", multerUpload.any(), getMarkets);
router.get("/:id", getMarketById);
router.post("/", createMarket);
router.put("/:id", updateMarket);
router.delete("/:id", deleteMarket);

export default router;
