import { Router } from "express";
import bodyParser from "./bodyParser.js";
import passport from "./passport.js";
import sequelize from "./sequelize.js";

const router = Router();

router.use(sequelize);
router.use(bodyParser);
router.use(passport);

export default router;
