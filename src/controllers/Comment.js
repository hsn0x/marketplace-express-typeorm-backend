import {
    createCommentQuery,
    deleteCommentQuery,
    findAllCommentsBySearchQuery,
    findAllCommentsQuery,
    findOneCommentQuery,
    updateCommentQuery,
} from "../queries/comments.js";
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js";

const getComments = async (req, res) => {
    const comments = await findAllCommentsQuery();
    if (comments) {
        res.status(200).json({
            message: `Comments found`,
            comments,
        });
    } else {
        res.status(404).json({ message: "No comments found" });
    }
};
const getCommentsBySearch = async (req, res) => {
    const query = req.params.query;

    const comments = await findAllCommentsBySearchQuery({ query });
    if (comments) {
        return res.status(200).json({
            message: `Comments found with query: ${query}, `,
            length: comments.length,
            comments,
        });
    } else {
        return res
            .status(404)
            .json({ message: `Comment not found with Query: ${query}` });
    }
};
const getCommentById = async (req, res) => {
    const id = parseInt(req.params.id);
    const comment = await findOneCommentQuery({ id });
    if (comment) {
        res.status(200).json({
            message: `Comment found with ID: ${id}`,
            comment,
        });
    } else {
        res.status(404).json({
            message: `Comment not found with ID: ${id}`,
        });
    }
};
const getCommentByName = async (req, res) => {
    const slug = req.params.slug;
    const comment = await findOneCommentQuery({ slug });
    if (comment) {
        res.status(200).json({
            message: `Comment found with ID: ${slug}`,
            comment,
        });
    } else {
        res.status(404).json({
            message: `Comment not found with ID: ${slug}`,
        });
    }
};
const createComment = async (req, res) => {
    const { session, user } = req;

    const { title, content, productId } = req.body;
    const commentData = {
        title,
        content,
        productId: parseInt(productId),
        UserId: user.id,
    };

    const isCommentValid = validateCreateComment(commentData);

    if (!isCommentValid.valid) {
        return res.status(400).json({
            message: "Invalid comment data",
            errors: isCommentValid.errors,
        });
    }

    const createdComment = await createCommentQuery(commentData);

    if (createdComment) {
        return res.status(201).json({
            message: `Comment added with ID: ${createdComment.id}`,
            data: createdComment,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a comment` });
    }
};

const updateComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    const { name, username, about, title, description, CategoriesIds } =
        req.body;

    const commentData = {
        name,
        username,
        title,
        description,
        about,
        CategoriesIds,
        UserId: user.id,
    };

    const isCommentValid = validateUpdateComment(commentData);

    if (!isCommentValid) {
        res.status(400).json({ message: "Comment not updated" });
    }

    const updatedComment = await updateCommentQuery(commentData, { id });

    if (updatedComment) {
        res.status(200).json({
            message: `Comment updated with ID: ${updatedComment[0]?.id}`,
            data: updatedComment,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a comment, ${id}`,
        });
    }
};

const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteCommentQuery({ id });
    res.status(200).json({ message: `Comment deleted with ID: ${id}` });
};

export {
    getComments,
    getCommentById,
    getCommentsBySearch,
    getCommentByName,
    createComment,
    updateComment,
    deleteComment,
};
