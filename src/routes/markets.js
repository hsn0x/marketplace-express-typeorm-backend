import { Router } from "express"
import {
    create,
    remove,
    getById,
    getByName,
    getMarkets,
    getMarketsBySearch,
    update,
} from "../controllers/Market.js"
import { isAuth } from "../middleware/Auth.js"
import { isMarketOwner, isMarketUsernameTaken } from "../middleware/Market.js"

const router = Router()

router.get("/", getMarkets)
router.get("/:id", getById)
router.get("/q/:query", getMarketsBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, isMarketUsernameTaken, create)
router.put("/:id", isAuth, isMarketUsernameTaken, isMarketOwner, update)
router.delete("/:id", isAuth, isMarketOwner, remove)

export default router
