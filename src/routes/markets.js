import { Router } from "express"
import { MarketController } from "../controllers/index.js"
import { AuthMiddleware, MarketMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getMarkets)
router.get("/:id", getById)
router.get("/q/:query", getMarketsBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, isUsernameTaken, create)
router.put("/:id", isAuth, isUsernameTaken, isOwner, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
