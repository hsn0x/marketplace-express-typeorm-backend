import { isVoteExist } from "../middleware/Vote.js"
import Product from "../models/Product.js"
import { productsQueries, votesQueries } from "../queries/index.js"
import { validateCreateVote, validateUpdateVote } from "../validation/Vote.js"

const getVotes = async (req, res) => {
    const votes = await votesQueries.findAllQuery()
    if (votes) {
        res.status(200).json({ votes })
    } else {
        res.status(404).json({ message: `Votes not found` })
    }
}
const getVotesBySearch = async (req, res) => {
    const query = req.params.query

    const votes = await votesQueries.findAllVotesBySearchQuery({ query })
    if (votes) {
        return res.status(200).json({
            message: `Votes found with query: ${query}, `,
            length: votes.length,
            votes,
        })
    } else {
        return res
            .status(404)
            .json({ message: `Vote not found with Query: ${query}` })
    }
}

const getById = async (req, res) => {
    const id = parseInt(req.params.id)
    const vote = await votesQueries.findOneQuery({ id })
    if (vote) {
        res.status(200).json({ vote })
    } else {
        res.status(404).json({ message: `Vote not found with ID: ${id}` })
    }
}
const getBySlug = async (req, res) => {
    const slug = req.params.slug
    const vote = await votesQueries.findOneQuery({ slug })
    if (vote) {
        res.status(200).json({ vote })
    } else {
        res.status(404).json({ message: `Vote not found with Slug: ${slug}` })
    }
}
const create = async (req, res, next) => {
    const { session, user } = req
    const { ProductId } = req.body
    const voteData = {
        UserId: user.id,
        ProductId,
    }

    // const isVoteValid = validateCreateVote(voteData);

    // if (!isVoteValid.valid) {
    //     return res.status(400).json({
    //         message: "Invalid vote data",
    //         errors: isVoteValid.errors,
    //     });
    // }
    // const product = await votesQueries.findByPkQuery(voteData.ProductId);

    const createdVote = await votesQueries.createQuery(voteData)

    if (createdVote) {
        return res.status(201).json({
            message: `Vote created with ID: ${createdVote.id}`,
            createdVote,
        })
    } else {
        return res.status(500).json({ message: `Faile to create a vote` })
    }
}
const update = async (req, res, next) => {
    const x = await votesQueries.isVoteExist(req, res, next)
    console.log({ x })
    if (!x) {
        await votesQueries.create(req, res)
    } else {
        await votesQueries.remove(req, res)
    }
}
const remove = async (req, res) => {
    const id = parseInt(req.params.id)
    await votesQueries.deleteQuery({ id })
    return res.status(200).json({ message: `Vote deleted with ID: ${id}` })
}

export {
    getVotes,
    getById,
    getBySlug,
    getVotesBySearch,
    create,
    update,
    remove,
}
