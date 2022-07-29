import { categoriesQueries } from "../queries/index.js"

import {
    validateCreateCategory,
    validateUpdateCategory,
} from "../validation/Category.js"

export default {
    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const data = await categoriesQueries.findOneQuery({ where: { id } })
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: `Record not found with ID: ${id}`,
            })
        }
    },

    getByName: async (req, res) => {
        const name = req.params.name
        const record = await categoriesQueries.findOneQuery({ where: { name } })
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).json({
                message: `Record not found with Slug: ${name}`,
            })
        }
    },

    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }
        const data = await categoriesQueries.findAllQuery(
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
    getAllByType: async (req, res) => {
        const type = req.params.type
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }
        const data = await categoriesQueries.findAllQuery(
            { type },
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
