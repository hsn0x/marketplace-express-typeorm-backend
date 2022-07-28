import { Router } from "express"
import { ProductController } from "../controllers/index.js"
import { AuthMiddleware, ProductMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", ProductController.getAll)
router.post("/", AuthMiddleware.isAuth, ProductController.create)

router.get("/title/:slug", ProductController.getBySlug)

router.get("/q/filters/:query", ProductController.getAllByFilters)
router.get("/q/:query", ProductController.getAllBySearch)

router.get("/:id", ProductController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    ProductMiddleware.isOwner,
    ProductController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    ProductMiddleware.isOwner,
    ProductController.remove
)

export default router
