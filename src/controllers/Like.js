import { isLikeExist } from "../middleware/Like.js";
import Product from "../models/Product.js";
import {
    createLikeQuery,
    deleteLikeQuery,
    findAllLikesQuery,
    findOneLikeQuery,
    updateLikeQuery,
    findAllLikesBySearchQuery,
    findByPkLikeQuery,
} from "../queries/likes.js";
import { findByPkProductQuery } from "../queries/products.js";
import { validateCreateLike, validateUpdateLike } from "../validation/Like.js";

const getLikes = async (req, res) => {
    const likes = await findAllLikesQuery();
    if (likes) {
        res.status(200).json({ likes });
    } else {
        res.status(404).json({ message: `Likes not found` });
    }
};
const getLikesBySearch = async (req, res) => {
    const query = req.params.query;

    const likes = await findAllLikesBySearchQuery({ query });
    if (likes) {
        return res.status(200).json({
            message: `Likes found with query: ${query}, `,
            length: likes.length,
            likes,
        });
    } else {
        return res
            .status(404)
            .json({ message: `Like not found with Query: ${query}` });
    }
};

const getLikeById = async (req, res) => {
    const id = parseInt(req.params.id);
    const like = await findOneLikeQuery({ id });
    if (like) {
        res.status(200).json({ like });
    } else {
        res.status(404).json({ message: `Like not found with ID: ${id}` });
    }
};
const getLikeBySlug = async (req, res) => {
    const slug = req.params.slug;
    const like = await findOneLikeQuery({ slug });
    if (like) {
        res.status(200).json({ like });
    } else {
        res.status(404).json({ message: `Like not found with Slug: ${slug}` });
    }
};
const createLike = async (req, res, next) => {
    const { session, user } = req;

    const { ProductId } = req.body;
    const likeData = {
        UserId: user.id,
        ProductId,
    };

    // const isLikeValid = validateCreateLike(likeData);

    // if (!isLikeValid.valid) {
    //     return res.status(400).json({
    //         message: "Invalid like data",
    //         errors: isLikeValid.errors,
    //     });
    // }
    // const product = await findByPkProductQuery(likeData.ProductId);

    const createdLike = await createLikeQuery(likeData);

    if (createdLike) {
        return res.status(201).json({
            message: `Like created with ID: ${createdLike.id}`,
            createdLike,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a like` });
    }
};
const updateLike = async (req, res, next) => {
    const x = await isLikeExist(req, res, next);
    console.log({ x });
    if (!x) {
        await createLike(req, res);
    } else {
        await deleteLike(req, res);
    }
};
const deleteLike = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteLikeQuery({ id });
    return res.status(200).json({ message: `Like deleted with ID: ${id}` });
};

export {
    getLikes,
    getLikeById,
    getLikeBySlug,
    getLikesBySearch,
    createLike,
    updateLike,
    deleteLike,
};
