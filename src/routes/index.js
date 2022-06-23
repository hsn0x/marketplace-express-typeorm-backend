import home from "./home.js";
import users from "./users.js";
import products from "./products.js";
import markets from "./markets.js";
import auth from "./auth.js";
import { Router } from "express";

const router = Router();

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

router.use("/", home);
router.use("/auth", auth);
router.use("/users", users);
router.use("/products", products);
router.use("/markets", markets);

export default router;
