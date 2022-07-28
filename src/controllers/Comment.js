import { commentsQueries } from "../queries/index.js"
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js"
export default {
    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const data = await commentsQueries.findOneQuery({ id })
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: `Record not found with ID: ${id}`,
            })
        }
    },

    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }
        const data = await commentsQueries.findAllQuery(
            {},
            ["withAssociations"],
            params
        )
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: `Records not found` })
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
