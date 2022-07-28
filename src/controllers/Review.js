import { reviewsQueries } from "../queries/index.js"
import {
    validateCreateReview,
    validateUpdateReview,
} from "../validation/Review.js"
export default {
    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const data = await reviewsQueries.findOneQuery({ id })
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
        const data = await reviewsQueries.findAllQuery(
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

        const { rate, title, content, productId } = req.body
        const reviewData = {
            rate: parseInt(rate),
            title,
            content,
            productId: parseInt(productId),
            UserId: user.id,
        }

        const isReviewValid = validateCreateReview(reviewData)

        if (!isReviewValid.valid) {
            return res.status(400).json({
                message: "Invalid review data",
                errors: isReviewValid.errors,
            })
        }

        const createdReview = await reviewsQueries.createQuery(reviewData)

        if (createdReview) {
            return res.status(201).json({
                message: `Review added with ID: ${createdReview.id}`,
                data: createdReview,
            })
        } else {
            return res.status(500).json({ message: `Faile to create a review` })
        }
    },

    update: async (req, res) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const { rate } = req.body

        const reviewData = {
            rate: parseInt(rate),
            UserId: user.id,
        }

        const isReviewValid = validateUpdateReview(reviewData)

        if (!isReviewValid) {
            res.status(400).json({ message: "Review not updated" })
        }

        const updatedReview = await reviewsQueries.updateQuery(reviewData, {
            id,
        })

        if (updatedReview) {
            res.status(200).json({
                message: `Review updated with ID: ${updatedReview[0]?.id}`,
                data: updatedReview,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a review, ${id}`,
            })
        }
    },

    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        await reviewsQueries.deleteQuery({ id })
        res.status(200).json({ message: `Review deleted with ID: ${id}` })
    },
}
