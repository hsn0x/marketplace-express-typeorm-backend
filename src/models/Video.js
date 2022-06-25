import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING } from "../db/dataTypes.js";

const Video = sequelize.define("Video", {
    public_id: {
        type: STRING,
    },
    url: {
        type: STRING,
    },
});
SequelizeSlugify.slugifyModel(Video, { source: ["name"] });

export default Video;
