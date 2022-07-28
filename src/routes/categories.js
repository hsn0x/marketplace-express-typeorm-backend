import { Router } from "express"
import {
    create,
    remove,
    getById,
    getAll,
    update,
    getByName,
    getAllByType,
} from "../controllers/Category.js"
import { isAdmin, isAuth } from "../middleware/Auth.js"
import { isExist, isNameExist } from "../middleware/Category.js"

const router = Router()

router.get("/", getAll)
router.get("/type/:type", getAllByType)
router.get("/name/:name", isNameExist, getByName)
router.get("/:id", isExist, getById)
router.post("/", isAuth, isAdmin, create)
router.put("/:id", isAuth, isAdmin, isExist, update)
router.delete("/:id", isAuth, isAdmin, remove)

export default router
