import { Router } from "express"
import { ProductController } from "../controllers/index.js"
import { AuthMiddleware, ProductMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getAll)
router.get("/:id", getById)
router.get("/title/:slug", getBySlug)
router.get("/q/filters/:query", getAllByFilters)
router.get("/q/:query", getAllBySearch)
router.post("/", isAuth, create)
router.put("/:id", isAuth, isOwner, update)
router.delete("/:id", isAuth, isOwner, remove)

export default router
