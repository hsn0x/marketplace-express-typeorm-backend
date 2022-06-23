import { cloudinaryConfig } from "./cloudinary.js";
import { expressConfig } from "./express.js";
import { sequelizeConfig } from "./sequelize.js";
import { sessionConfig } from "./session.js";
import { passportConfig } from "./passport.js";

export {
    sequelizeConfig,
    expressConfig,
    cloudinaryConfig,
    sessionConfig,
    passportConfig,
};

console.dir({
    sequelizeConfig,
    expressConfig,
    cloudinaryConfig,
    sessionConfig,
    passportConfig,
});
