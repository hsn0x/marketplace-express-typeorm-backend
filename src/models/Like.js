import sequelize from "../db/sequelize.js"

import { INTEGER, STRING } from "../db/dataTypes.js"
import { Model } from "sequelize"

class Like extends Model {
    async getLikeables(options) {
        const products = await this.getAll(options)
        const markets = await this.getAll(options)
        return products.concat(markets)
    }
}
Like.init(
    {
        likeableId: INTEGER,
        likeableType: STRING,
    },
    { sequelize, modelName: "like" }
)

export default Like
