import { Router } from "express"
import { MarketController } from "../controllers/index.js"
import { AuthMiddleware, MarketMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", MarketController.getAll)
router.post(
    "/",
    AuthMiddleware.isAuth,
    MarketMiddleware.isUsernameTaken,
    MarketController.create
)

router.get("/q/:query", MarketController.getAllBySearch)
router.get("/name/:slug", MarketController.getByName)

router.get("/:id", MarketController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    MarketMiddleware.isUsernameTaken,
    MarketMiddleware.isOwner,
    MarketController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    MarketMiddleware.isOwner,
    MarketController.remove
)

export default router
