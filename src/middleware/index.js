import { Router } from "express";
import bodyParser from "./BodyParser.js";
import passport from "./Passport.js";
import sequelize from "./Sequelize.js";

const router = Router();

router.use(sequelize);
router.use(bodyParser);
router.use(passport);

export default router;
