import { Router } from "express"
import { CategoryController } from "../controllers/index.js"
import { AuthMiddleware, CategoryMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getAll)
router.get("/type/:type", getAllByType)
router.get("/name/:name", isNameExist, getByName)
router.get("/:id", isExist, getById)
router.post("/", isAuth, isAdmin, create)
router.put("/:id", isAuth, isAdmin, isExist, update)
router.delete("/:id", isAuth, isAdmin, remove)

export default router
