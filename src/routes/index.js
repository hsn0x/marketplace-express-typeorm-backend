/**
 * @description - Import routes for the application.
 */
import home from "./home.js"
import users from "./users.js"
import products from "./products.js"
import markets from "./markets.js"
import auth from "./auth.js"
import admin from "./admin.js"
import categories from "./categories.js"

import comments from "./comments.js"
import reviews from "./reviews.js"

import likes from "./likes.js"
import votes from "./votes.js"
import favorites from "./favorites.js"

/**
 * import Middleware for the application.
 */
import { AuthMiddleware } from "../middleware/index.js"

/**
 * @description - Import router for the application.
 */
import { Router } from "express"

/**
 * @description - Create a new router for the application.
 */
const router = Router()

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
/**
 * @description - Routes for the application.
 */
router.use("/", home)
router.use("/auth", auth)
router.use("/users", users)
router.use("/products", products)
router.use("/markets", markets)
router.use("/admin", AuthMiddleware.isAuth, AuthMiddleware.isAdmin, admin)
router.use("/categories", categories)

router.use("/comments", comments)
router.use("/reviews", reviews)

// Buttons
router.use("/likes", likes)
router.use("/votes", votes)
router.use("/favorites", favorites)

export default router
