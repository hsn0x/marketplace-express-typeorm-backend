import { Op } from "sequelize"
import { Market } from "../scopes/index.js"

const findAllMarketsQuery = async () => {
    const markets = await Market.scope("withAssociations").findAll()
    return markets
}
const findAllMarketsBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

    const market = await Market.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    })
    return market
}
const findByPkMarketQuery = async (id) => {
    const market = await Market.scope("withAssociations").findByPk(id)
    return market
}
const findOneMarketQuery = async (where) => {
    const market = await Market.scope("withAssociations").findOne({ where })
    return market
}

const create = async (marketData) => {
    const createdMarket = await Market.create(marketData)
    marketData.CategoriesIds.map(
        async (ci) => await createdMarket.addCategory(ci)
    )
    return createdMarket
}

const create = async (marketData, where) => {
    await Market.update(marketData, { where })
    const updatedMarket = await Market.scope("withAssociations").findOne({
        where,
    })
    updatedMarket.categories.map(
        async (c) => await updatedMarket.removeCategory(c.id)
    )
    marketData.CategoriesIds.map(
        async (ci) => await updatedMarket.addCategory(ci)
    )
    return updatedMarket
}

const remove = async (where) => {
    const deletedMarket = await Market.destroy({
        where,
    })
    return deletedMarket
}

export {
    findAllMarketsQuery,
    findAllMarketsBySearchQuery,
    findByPkMarketQuery,
    findOneMarketQuery,
    create,
    create,
    remove,
}
