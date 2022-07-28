import { Router } from "express"
import { UserController } from "../controllers/index.js"
import { AuthMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", UserController.getAll)
router.post(
    "/",
    AuthMiddleware.isAuth,
    AuthMiddleware.isAdmin,
    AuthMiddleware.isEmailExist,
    AuthMiddleware.isUsernameTaken,
    UserController.create
)

router.get("/username/:username", UserController.getByUsername)
router.put(
    "/email/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isEmailExist,
    AuthMiddleware.isUserAuth,
    UserController.updateEmail
)
router.put(
    "/password/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isUserAuth,
    UserController.updatePassword
)

router.get("/:id", UserController.getById)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isUsernameTaken,
    AuthMiddleware.isUserAuth,
    UserController.update
)

router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    AuthMiddleware.isUserAuth,
    UserController.remove
)

export default router
