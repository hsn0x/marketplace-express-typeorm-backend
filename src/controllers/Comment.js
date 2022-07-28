import { commentsQueries } from "../queries/index.js"
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js"
export default {
    getAll: async (req, res) => {
        const comments = await commentsQueries.findAllQuery()
        if (comments) {
            res.status(200).json({
                message: `Comments found`,
                comments,
            })
        } else {
            res.status(404).json({ message: "No comments found" })
        }
    },
    getAllBySearch: async (req, res) => {
        const query = req.params.query

        const comments = await commentsQueries.findAllCommentsBySearchQuery({
            query,
        })
        if (comments) {
            return res.status(200).json({
                message: `Comments found with query: ${query}, `,
                length: comments.length,
                comments,
            })
        } else {
            return res
                .status(404)
                .json({ message: `Comment not found with Query: ${query}` })
        }
    },
    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const comment = await commentsQueries.findOneQuery({ id })
        if (comment) {
            res.status(200).json({
                message: `Comment found with ID: ${id}`,
                comment,
            })
        } else {
            res.status(404).json({
                message: `Comment not found with ID: ${id}`,
            })
        }
    },
    getByName: async (req, res) => {
        const slug = req.params.slug
        const comment = await commentsQueries.findOneQuery({ slug })
        if (comment) {
            res.status(200).json({
                message: `Comment found with ID: ${slug}`,
                comment,
            })
        } else {
            res.status(404).json({
                message: `Comment not found with ID: ${slug}`,
            })
        }
    },
    create: async (req, res) => {
        const { session, user } = req

        const { title, content, productId } = req.body
        const commentData = {
            title,
            content,
            productId: parseInt(productId),
            UserId: user.id,
        }

        const isCommentValid = validateCreateComment(commentData)

        if (!isCommentValid.valid) {
            return res.status(400).json({
                message: "Invalid comment data",
                errors: isCommentValid.errors,
            })
        }

        const createdComment = await commentsQueries.createQuery(commentData)

        if (createdComment) {
            return res.status(201).json({
                message: `Comment added with ID: ${createdComment.id}`,
                data: createdComment,
            })
        } else {
            return res
                .status(500)
                .json({ message: `Faile to create a comment` })
        }
    },

    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const { name, username, about, title, description, CategoriesIds } =
            req.body

        const commentData = {
            name,
            username,
            title,
            description,
            about,
            CategoriesIds,
            UserId: user.id,
        }

        const isCommentValid = validateUpdateComment(commentData)

        if (!isCommentValid) {
            res.status(400).json({ message: "Comment not updated" })
        }

        const updatedComment = await commentsQueries.updateQuery(commentData, {
            id,
        })

        if (updatedComment) {
            res.status(200).json({
                message: `Comment updated with ID: ${updatedComment[0]?.id}`,
                data: updatedComment,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a comment, ${id}`,
            })
        }
    },

    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        await commentsQueries.deleteQuery({ id })
        res.status(200).json({ message: `Comment deleted with ID: ${id}` })
    },
}
