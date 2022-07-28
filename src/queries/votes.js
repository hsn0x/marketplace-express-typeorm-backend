import { Op } from "sequelize"
import { Vote, Product } from "../scopes/index.js"
import { findByPkQuery } from "./products.js"

const findAllVotesQuery = async () => {
    const votes = await Vote.scope("withAssociations").findAll()
    return votes
}
const findAllVotesBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.vote]: `%${q}%` } }))

    const vote = await Vote.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    })
    return vote
}
const findByPkVoteQuery = async (id) => {
    const vote = await Vote.scope("withAssociations").findByPk(id)
    return vote
}
const findOneVoteQuery = async (where) => {
    const vote = await Vote.scope("withAssociations").findOne({ where })
    return vote
}

const createVoteQuery = async (voteData) => {
    const product = await findByPkQuery(voteData.ProductId)

    const createdVote = await product.createVote({
        UserId: voteData.UserId,
    })
    return createdVote
}

const updateVoteQuery = async (voteData, where) => {}

const deleteVoteQuery = async (where) => {
    const deletedVote = await Vote.destroy({
        where,
    })
    return deletedVote
}

export {
    findAllVotesQuery,
    findAllVotesBySearchQuery,
    findByPkVoteQuery,
    findOneVoteQuery,
    createVoteQuery,
    updateVoteQuery,
    deleteVoteQuery,
}
