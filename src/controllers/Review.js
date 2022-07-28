import { reviewsQueries } from "../queries/index.js"
import {
    validateCreateReview,
    validateUpdateReview,
} from "../validation/Review.js"
export default {
    getAll: async (req, res) => {
        const reviews = await reviewsQueries.findAllQuery(
            {},
            ["withAssociations"],
            params
        )
        if (reviews) {
            res.status(200).json({
                message: `Reviews found`,
                reviews,
            })
        } else {
            res.status(404).json({ message: "No reviews found" })
        }
    },
    getAllBySearch: async (req, res) => {
        const query = req.params.query

        const reviews = await reviewsQueries.findAllReviewsBySearchQuery({
            query,
        })
        if (reviews) {
            return res.status(200).json({
                message: `Reviews found with query: ${query}, `,
                length: reviews.length,
                reviews,
            })
        } else {
            return res
                .status(404)
                .json({ message: `Review not found with Query: ${query}` })
        }
    },
    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const review = await reviewsQueries.findOneQuery({ id })
        if (review) {
            res.status(200).json({
                message: `Review found with ID: ${id}`,
                review,
            })
        } else {
            res.status(404).json({
                message: `Review not found with ID: ${id}`,
            })
        }
    },
    getByName: async (req, res) => {
        const slug = req.params.slug
        const review = await reviewsQueries.findOneQuery({ slug })
        if (review) {
            res.status(200).json({
                message: `Review found with ID: ${slug}`,
                review,
            })
        } else {
            res.status(404).json({
                message: `Review not found with ID: ${slug}`,
            })
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
