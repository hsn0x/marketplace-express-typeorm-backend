import { Router } from "express"
import { UserController } from "../controllers/index.js"
import { AuthMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", getAll)
router.get("/:id", getById)
router.get("/username/:username", getByUsername)
router.post("/", isAuth, isAdmin, isEmailExist, isUsernameTaken, createUser)
router.put("/:id", isAuth, isUsernameTaken, isUserAuth, updateUser)
router.put("/email/:id", isAuth, isEmailExist, isUserAuth, updateUserEmail)
router.put("/password/:id", isAuth, isUserAuth, updateUserPassword)
router.delete("/:id", isAuth, isUserAuth, deleteUser)

export default router
