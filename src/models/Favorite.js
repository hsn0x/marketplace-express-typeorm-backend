import sequelize from "../db/sequelize.js";

import { INTEGER, STRING } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Favorite extends Model {
    async getFavoriteables(options) {
        const products = await this.getProducts(options);
        const markets = await this.getMarkets(options);
        return products.concat(markets);
    }
}
Favorite.init(
    {
        favoriteableId: INTEGER,
        favoriteableType: STRING,
    },
    { sequelize, modelName: "favorite" }
);

export default Favorite;
