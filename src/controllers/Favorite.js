import { FavoriteMiddleware } from "../middleware/index.js"
import Product from "../models/Product.js"
import { favoritesQueries, productsQueries } from "../queries/index.js"
import {
    validateCreateFavorite,
    validateUpdateFavorite,
} from "../validation/Favorite.js"

export default {
    getAll: async (req, res) => {
        const favorites = await productsQueries.findAllQuery(
            {},
            ["withAssociations"],
            params
        )
        if (favorites) {
            res.status(200).json({ favorites })
        } else {
            res.status(404).json({ message: `Favorites not found` })
        }
    },
    getAllBySearch: async (req, res) => {
        const query = req.params.query

        const favorites = await productsQueries.findAllFavoritesBySearchQuery({
            query,
        })
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
    },

    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const favorite = await productsQueries.findOneQuery({ where: { id } })
        if (favorite) {
            res.status(200).json({ favorite })
        } else {
            res.status(404).json({
                message: `Favorite not found with ID: ${id}`,
            })
        }
    },
    getBySlug: async (req, res) => {
        const slug = req.params.slug
        const favorite = await productsQueries.findOneQuery({ where: { slug } })
        if (favorite) {
            res.status(200).json({ favorite })
        } else {
            res.status(404).json({
                message: `Favorite not found with Slug: ${slug}`,
            })
        }
    },
    create: async (req, res, next) => {
        const { session, user } = req
        const { ProductId } = req.body
        const favoriteData = {
            UserId: user.id,
            ProductId,
        }

        // const isValid = validateCreateFavorite(favoriteData);

        // if (!isValid.valid) {
        //     return res.status(400).json({
        //         message: "Invalid favorite data",
        //         errors: isValid.errors,
        //     });
        // }
        // const product = await productsQueries.findByPkQuery(favoriteData.ProductId);

        const createdFavorite = await productsQueries.createQuery(favoriteData)

        if (createdFavorite) {
            return res.status(201).json({
                message: `Favorite created with ID: ${createdFavorite.id}`,
                createdFavorite,
            })
        } else {
            return res
                .status(500)
                .json({ message: `Faile to create a favorite` })
        }
    },
    update: async (req, res, next) => {
        const x = await productsQueries.isExist(req, res, next)
        console.log({ x })
        if (!x) {
            await productsQueries.create(req, res)
        } else {
            await productsQueries.remove(req, res)
        }
    },
    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        await productsQueries.deleteQuery({ id })
        return res
            .status(200)
            .json({ message: `Favorite deleted with ID: ${id}` })
    },
}
