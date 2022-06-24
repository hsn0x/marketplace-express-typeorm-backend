import "./env.js";

import { cloudinaryConfig } from "./cloudinary.js";
import { expressConfig } from "./express.js";
import { sequelizeConfig } from "./sequelize.js";
import { sessionConfig } from "./session.js";
import { passportConfig } from "./passport.js";
import { ownerConfig } from "./owner.js";

export {
    sequelizeConfig,
    expressConfig,
    cloudinaryConfig,
    sessionConfig,
    passportConfig,
    ownerConfig,
};

console.dir({
    sequelizeConfig,
    expressConfig,
    cloudinaryConfig,
    sessionConfig,
    passportConfig,
    sequelizeConfig,
    ownerConfig,
});
