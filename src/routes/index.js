import { Router } from "express";

/**
 * @description - Import routes for the application.
 */
import home from "./home.js";
import users from "./users.js";
import products from "./products.js";
import markets from "./markets.js";
import auth from "./auth.js";
import admin from "./admin.js";
import { isAdmin, isAuth } from "../middleware/Auth.js";

const router = Router();

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
/**
 * @description - Routes for the application.
 */
router.use("/", home);
router.use("/auth", auth);
router.use("/users", users);
router.use("/products", products);
router.use("/markets", markets);
router.use("/admin", isAuth, isAdmin, admin);

export default router;
