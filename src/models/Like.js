import sequelize from "../db/sequelize.js";

import { INTEGER, STRING } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Like extends Model {
    async getLikeables(options) {
        const products = await this.getProducts(options);
        const markets = await this.getMarkets(options);
        return products.concat(markets);
    }
}
Like.init(
    {
        likeableId: INTEGER,
        likeableType: STRING,
    },
    { sequelize, modelName: "like" }
);

export default Like;
