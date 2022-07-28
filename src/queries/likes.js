import { Op } from "sequelize"
import { Like, Product } from "../scopes/index.js"
import { findByPkQuery } from "./products.js"

const findAllLikesQuery = async () => {
    const likes = await Like.scope("withAssociations").findAll()
    return likes
}
const findAllLikesBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }))

    const like = await Like.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    })
    return like
}
const findByPkLikeQuery = async (id) => {
    const like = await Like.scope("withAssociations").findByPk(id)
    return like
}
const findOneLikeQuery = async (where) => {
    const like = await Like.scope("withAssociations").findOne({ where })
    return like
}

const createLikeQuery = async (likeData) => {
    const product = await findByPkQuery(likeData.ProductId)

    const createdLike = await product.createLike({
        UserId: likeData.UserId,
    })
    return createdLike
}

const updateLikeQuery = async (likeData, where) => {}

const deleteLikeQuery = async (where) => {
    const deletedLike = await Like.destroy({
        where,
    })
    return deletedLike
}

export {
    findAllLikesQuery,
    findAllLikesBySearchQuery,
    findByPkLikeQuery,
    findOneLikeQuery,
    createLikeQuery,
    updateLikeQuery,
    deleteLikeQuery,
}
