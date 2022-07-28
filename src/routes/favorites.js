import { Router } from "express"
import {
    create,
    remove,
    getById,
    getFavorites,
    update,
} from "../controllers/Favorite.js"
import { isAuth } from "../middleware/Auth.js"
import { isFavoriteExist, isFavoriteOwner } from "../middleware/Favorite.js"

const router = Router()

router.get("/", getFavorites)
router.get("/:id", getById)
router.post("/", isAuth, create)
router.put("/", isAuth, update)
router.delete("/:id", isAuth, isFavoriteOwner, remove)

export default router
