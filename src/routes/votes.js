import { Router } from "express";
import {
    createVote,
    deleteVote,
    getVoteById,
    getVotes,
    updateVote,
} from "../controllers/Vote.js";
import { isAuth } from "../middleware/Auth.js";
import { isVoteExist, isVoteOwner } from "../middleware/Vote.js";

const router = Router();

router.get("/", getVotes);
router.get("/:id", getVoteById);
router.post("/", isAuth, createVote);
router.put("/", isAuth, updateVote);
router.delete("/:id", isAuth, isVoteOwner, deleteVote);

export default router;
