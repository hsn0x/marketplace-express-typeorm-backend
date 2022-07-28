import { isFavoriteExist } from "../middleware/Favorite.js"
import Product from "../models/Product.js"
import {
    createQuery,
    deleteQuery,
    findAllQuery,
    findOneQuery,
    updateQuery,
    findAllFavoritesBySearchQuery,
    findByPkQuery,
} from "../queries/favorites.js"
import { findByPkQuery } from "../queries/products.js"
import {
    validateCreateFavorite,
    validateUpdateFavorite,
} from "../validation/Favorite.js"

const getFavorites = async (req, res) => {
    const favorites = await findAllQuery()
    if (favorites) {
        res.status(200).json({ favorites })
    } else {
        res.status(404).json({ message: `Favorites not found` })
    }
}
const getFavoritesBySearch = async (req, res) => {
    const query = req.params.query

    const favorites = await findAllFavoritesBySearchQuery({ query })
    if (favorites) {
        return res.status(200).json({
            message: `Favorites found with query: ${query}, `,
            length: favorites.length,
            favorites,
        })
    } else {
        return res
            .status(404)
            .json({ message: `Favorite not found with Query: ${query}` })
    }
}

const getById = async (req, res) => {
    const id = parseInt(req.params.id)
    const favorite = await findOneQuery({ id })
    if (favorite) {
        res.status(200).json({ favorite })
    } else {
        res.status(404).json({ message: `Favorite not found with ID: ${id}` })
    }
}
const getBySlug = async (req, res) => {
    const slug = req.params.slug
    const favorite = await findOneQuery({ slug })
    if (favorite) {
        res.status(200).json({ favorite })
    } else {
        res.status(404).json({
            message: `Favorite not found with Slug: ${slug}`,
        })
    }
}
const create = async (req, res, next) => {
    const { session, user } = req
    const { ProductId } = req.body
    const favoriteData = {
        UserId: user.id,
        ProductId,
    }

    // const isFavoriteValid = validateCreateFavorite(favoriteData);

    // if (!isFavoriteValid.valid) {
    //     return res.status(400).json({
    //         message: "Invalid favorite data",
    //         errors: isFavoriteValid.errors,
    //     });
    // }
    // const product = await findByPkQuery(favoriteData.ProductId);

    const createdFavorite = await createQuery(favoriteData)

    if (createdFavorite) {
        return res.status(201).json({
            message: `Favorite created with ID: ${createdFavorite.id}`,
            createdFavorite,
        })
    } else {
        return res.status(500).json({ message: `Faile to create a favorite` })
    }
}
const update = async (req, res, next) => {
    const x = await isFavoriteExist(req, res, next)
    console.log({ x })
    if (!x) {
        await create(req, res)
    } else {
        await remove(req, res)
    }
}
const remove = async (req, res) => {
    const id = parseInt(req.params.id)
    await deleteQuery({ id })
    return res.status(200).json({ message: `Favorite deleted with ID: ${id}` })
}

export {
    getFavorites,
    getById,
    getBySlug,
    getFavoritesBySearch,
    create,
    update,
    remove,
}
