import sequelize from "../db/sequelize.js"

import { INTEGER, STRING } from "../db/dataTypes.js"
import { Model } from "sequelize"

class Vote extends Model {
    async getVoteables(options) {
        const products = await this.getAll(options)
        const markets = await this.getMarkets(options)
        return products.concat(markets)
    }
}
Vote.init(
    {
        voteableId: INTEGER,
        voteableType: STRING,
    },
    { sequelize, modelName: "vote" }
)

export default Vote
