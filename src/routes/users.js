import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
    updateUserEmail,
    updateUserPassword,
} from "../controllers/User.js";
import {
    isAuth,
    isEmailExist,
    isGuest,
    isUserAuth,
    isUsernameTaken,
} from "../middleware/Auth.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", isGuest, isEmailExist, isUsernameTaken, createUser);
router.put("/:id", isAuth, isUsernameTaken, isUserAuth, updateUser);
router.put("/email/:id", isAuth, isEmailExist, isUserAuth, updateUserEmail);
router.put("/password/:id", isAuth, isUserAuth, updateUserPassword);
router.delete("/:id", isAuth, isUserAuth, deleteUser);

export default router;
