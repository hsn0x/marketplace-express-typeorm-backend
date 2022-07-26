import { isVoteExist } from "../middleware/Vote.js";
import Product from "../models/Product.js";
import {
    createVoteQuery,
    deleteVoteQuery,
    findAllVotesQuery,
    findOneVoteQuery,
    updateVoteQuery,
    findAllVotesBySearchQuery,
    findByPkVoteQuery,
} from "../queries/votes.js";
import { findByPkProductQuery } from "../queries/products.js";
import { validateCreateVote, validateUpdateVote } from "../validation/Vote.js";

const getVotes = async (req, res) => {
    const votes = await findAllVotesQuery();
    if (votes) {
        res.status(200).json({ votes });
    } else {
        res.status(404).json({ message: `Votes not found` });
    }
};
const getVotesBySearch = async (req, res) => {
    const query = req.params.query;

    const votes = await findAllVotesBySearchQuery({ query });
    if (votes) {
        return res.status(200).json({
            message: `Votes found with query: ${query}, `,
            length: votes.length,
            votes,
        });
    } else {
        return res
            .status(404)
            .json({ message: `Vote not found with Query: ${query}` });
    }
};

const getVoteById = async (req, res) => {
    const id = parseInt(req.params.id);
    const vote = await findOneVoteQuery({ id });
    if (vote) {
        res.status(200).json({ vote });
    } else {
        res.status(404).json({ message: `Vote not found with ID: ${id}` });
    }
};
const getVoteBySlug = async (req, res) => {
    const slug = req.params.slug;
    const vote = await findOneVoteQuery({ slug });
    if (vote) {
        res.status(200).json({ vote });
    } else {
        res.status(404).json({ message: `Vote not found with Slug: ${slug}` });
    }
};
const createVote = async (req, res, next) => {
    const { session, user } = req;
    const { ProductId } = req.body;
    const voteData = {
        UserId: user.id,
        ProductId,
    };

    // const isVoteValid = validateCreateVote(voteData);

    // if (!isVoteValid.valid) {
    //     return res.status(400).json({
    //         message: "Invalid vote data",
    //         errors: isVoteValid.errors,
    //     });
    // }
    // const product = await findByPkProductQuery(voteData.ProductId);

    const createdVote = await createVoteQuery(voteData);

    if (createdVote) {
        return res.status(201).json({
            message: `Vote created with ID: ${createdVote.id}`,
            createdVote,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a vote` });
    }
};
const updateVote = async (req, res, next) => {
    const x = await isVoteExist(req, res, next);
    console.log({ x });
    if (!x) {
        await createVote(req, res);
    } else {
        await deleteVote(req, res);
    }
};
const deleteVote = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteVoteQuery({ id });
    return res.status(200).json({ message: `Vote deleted with ID: ${id}` });
};

export {
    getVotes,
    getVoteById,
    getVoteBySlug,
    getVotesBySearch,
    createVote,
    updateVote,
    deleteVote,
};
