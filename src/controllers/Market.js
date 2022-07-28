import { marketsQueries } from "../queries/index.js"
import {
    validateCreateMarket,
    validateUpdateMarket,
} from "../validation/Market.js"

const getMarkets = async (req, res) => {
    const markets = await marketsQueries.findAllQuery()
    if (markets) {
        res.status(200).json({
            message: `Markets found`,
            markets,
        })
    } else {
        res.status(404).json({ message: "No markets found" })
    }
}
const getMarketsBySearch = async (req, res) => {
    const query = req.params.query

    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

    const markets = await marketsQueries.findAllQuery({
        where: {
            [Op.or]: [...queries],
        },
    })
    if (markets) {
        return res.status(200).json({
            message: `Markets found with query: ${query}, `,
            length: markets.length,
            markets,
        })
    } else {
        return res
            .status(404)
            .json({ message: `Market not found with Query: ${query}` })
    }
}
const getById = async (req, res) => {
    const id = parseInt(req.params.id)
    const market = await marketsQueries.findOneQuery({ id })
    if (market) {
        res.status(200).json({
            message: `Market found with ID: ${id}`,
            market,
        })
    } else {
        res.status(404).json({
            message: `Market not found with ID: ${id}`,
        })
    }
}
const getByName = async (req, res) => {
    const slug = req.params.slug
    const market = await marketsQueries.findOneQuery({ slug })
    if (market) {
        res.status(200).json({
            message: `Market found with ID: ${slug}`,
            market,
        })
    } else {
        res.status(404).json({
            message: `Market not found with ID: ${slug}`,
        })
    }
}

const create = async (req, res) => {
    const { session, user } = req

    const { name, username, title, description, about, CategoriesIds } =
        req.body
    const marketData = {
        name,
        username,
        title,
        description,
        about,
        UserId: user.id,
        CategoriesIds,
    }

    const isMarketValid = validateCreateMarket(marketData)

    if (!isMarketValid.valid) {
        return res.status(400).json({
            message: "Invalid market data",
            errors: isMarketValid.errors,
        })
    }

    const createdMarket = await marketsQueries.create(marketData)

    if (createdMarket) {
        return res.status(201).json({
            message: `Market added with ID: ${createdMarket.id}`,
            data: createdMarket,
        })
    } else {
        return res.status(500).json({ message: `Faile to create a market` })
    }
}

const update = async (req, res) => {
    const id = parseInt(req.params.id)
    const { session, user } = req

    const { name, username, about, title, description, CategoriesIds } =
        req.body

    const marketData = {
        name,
        username,
        title,
        description,
        about,
        CategoriesIds,
        UserId: user.id,
    }

    const isMarketValid = validateUpdateMarket(marketData)

    if (!isMarketValid) {
        res.status(400).json({ message: "Market not updated" })
    }

    const updatedMarket = await marketsQueries.create(marketData, { id })

    if (updatedMarket) {
        res.status(200).json({
            message: `Market updated with ID: ${updatedMarket[0]?.id}`,
            data: updatedMarket,
        })
    } else {
        res.status(500).json({
            message: `Faile to update a market, ${id}`,
        })
    }
}

const remove = async (req, res) => {
    const id = parseInt(req.params.id)
    await marketsQueries.remove({ id })
    res.status(200).json({ message: `Market deleted with ID: ${id}` })
}

export {
    getMarkets,
    getById,
    getMarketsBySearch,
    getByName,
    create,
    update,
    remove,
}
