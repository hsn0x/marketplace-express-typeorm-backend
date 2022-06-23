import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from "../controllers/User.js";
import { isAuth } from "../middleware/Auth.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", isAuth, updateUser);
router.delete("/:id", isAuth, deleteUser);

export default router;
