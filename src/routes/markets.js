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
import { isOwner, isUsernameTaken } from "../middleware/Market.js"

const router = Router()

router.get("/", getMarkets)
router.get("/:id", getById)
router.get("/q/:query", getMarketsBySearch)
router.get("/name/:slug", getByName)
router.post("/", isAuth, isUsernameTaken, create)
router.put("/:id", isAuth, isUsernameTaken, isOwner, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
