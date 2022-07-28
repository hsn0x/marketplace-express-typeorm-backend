import { categoriesQueries } from "../queries/index.js"

import {
    validateCreateCategory,
    validateUpdateCategory,
} from "../validation/Category.js"

export default {
    getAll: async (req, res) => {
        const categories = await categoriesQueries.findAllQuery()
        if (categories) {
            res.status(200).json({
                message: `Categories found`,
                length: categories.length,
                categories,
            })
        } else {
            res.status(404).json({ message: "No categories found" })
        }
    },
    getAllByType: async (req, res) => {
        const type = req.params.type
        const categories = await categoriesQueries.findAllWhereQuery({ type })
        if (categories) {
            res.status(200).json({
                message: `Categories found`,
                length: categories.length,
                categories,
            })
        } else {
            res.status(404).json({ message: "No categories found" })
        }
    },
    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const category = await categoriesQueries.findOneQuery({ id })
        if (category) {
            res.status(200).json({
                message: `Category found with ID: ${id}`,
                category,
            })
        } else {
            res.status(404).json({
                message: `Category not found with ID: ${id}`,
            })
        }
    },

    getByName: async (req, res) => {
        const name = req.params.name
        const category = await categoriesQueries.findOneQuery({ name })
        if (category) {
            res.status(200).json({
                message: `Category found with ID: ${name}`,
                category,
            })
        } else {
            res.status(404).json({
                message: `Category not found with ID: ${name}`,
            })
        }
    },

    create: async (req, res) => {
        const { session, user } = req
        const parentId = parseInt(req.body.parentId)

        const { name, description, type } = req.body
        const categoryData = {
            name,
            description,
            parentId,
            UserId: user.id,
            type,
        }

        const isValid = validateCreateCategory(categoryData)

        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid category data",
                errors: isValid.errors,
            })
        }

        const createdCategory = await categoriesQueries.createQuery(
            categoryData
        )

        if (createdCategory) {
            return res.status(201).json({
                message: `Category added with ID: ${createdCategory.id}`,
                createdCategory,
            })
        } else {
            return res
                .status(500)
                .json({ message: `Faile to create a category` })
        }
    },

    update: async (req, res) => {
        const id = parseInt(req.params.id)
        const { name, username, about, title } = req.body

        const categoryData = {
            name,
            username,
            about,
            title,
        }

        const isValid = validateUpdateCategory(categoryData)

        if (!isValid) {
            res.status(400).json({ message: "Category not updated" })
        }

        const updatedCategory = await categoriesQueries.updateQuery(
            categoryData,
            {
                id,
            }
        )

        if (updatedCategory) {
            res.status(200).json({
                message: `Category updated with ID: ${updatedCategory[0]?.id}`,
                updatedCategory,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a category, ${id}`,
            })
        }
    },

    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        await categoriesQueries.deleteQuery({ id })
        res.status(200).json({ message: `Category deleted with ID: ${id}` })
    },
}
