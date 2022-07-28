import sequelize from "../db/sequelize.js"
import SequelizeSlugify from "sequelize-slugify"

import { INTEGER, STRING } from "../db/dataTypes.js"
import { Model } from "sequelize"

class Category extends Model {
    async getCategoryables(options) {
        const markets = await this.getAll(options)
        const products = await this.getAll(options)

        return markets.concat(products)
    }
}

Category.init(
    {
        name: {
            type: STRING,
            allowNull: false,
        },
        slug: {
            type: STRING,
        },
        description: {
            type: STRING,
        },
        parentId: {
            type: INTEGER,
        },
        type: {
            type: STRING,
        },
    },
    { sequelize, modelName: "category" }
)

SequelizeSlugify.slugifyModel(Category, { source: ["name"] })

export default Category
