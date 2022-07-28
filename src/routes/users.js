import { Router } from "express"
import {
    createUser,
    deleteUser,
    getById,
    getByUsername,
    getUsers,
    updateUser,
    updateUserEmail,
    updateUserPassword,
} from "../controllers/User.js"
import {
    isAdmin,
    isAuth,
    isEmailExist,
    isGuest,
    isUserAuth,
    isUsernameTaken,
} from "../middleware/Auth.js"

const router = Router()

router.get("/", getUsers)
router.get("/:id", getById)
router.get("/username/:username", getByUsername)
router.post("/", isAuth, isAdmin, isEmailExist, isUsernameTaken, createUser)
router.put("/:id", isAuth, isUsernameTaken, isUserAuth, updateUser)
router.put("/email/:id", isAuth, isEmailExist, isUserAuth, updateUserEmail)
router.put("/password/:id", isAuth, isUserAuth, updateUserPassword)
router.delete("/:id", isAuth, isUserAuth, deleteUser)

export default router
