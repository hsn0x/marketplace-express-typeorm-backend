import { Router } from "express"
import {
    create,
    remove,
    getById,
    getAllBySearch,
    getBySlug,
    getAll,
    update,
    getAllByFilters,
} from "../controllers/Product.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner } from "../middleware/Product.js"

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
