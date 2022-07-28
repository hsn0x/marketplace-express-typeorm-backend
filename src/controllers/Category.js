import {
    createQuery,
    deleteQuery,
    findAllQuery,
    findAllWhereQuery,
    findOneQuery,
    updateQuery,
} from "../queries/categories.js"

import {
    validateCreateCategory,
    validateUpdateCategory,
} from "../validation/Category.js"

const getCategories = async (req, res) => {
    const categories = await findAllQuery()
    if (categories) {
        res.status(200).json({
            message: `Categories found`,
            length: categories.length,
            categories,
        })
    } else {
        res.status(404).json({ message: "No categories found" })
    }
}
const getCategoriesByType = async (req, res) => {
    const type = req.params.type
    const categories = await findAllWhereQuery({ type })
    if (categories) {
        res.status(200).json({
            message: `Categories found`,
            length: categories.length,
            categories,
        })
    } else {
        res.status(404).json({ message: "No categories found" })
    }
}
const getCategoryById = async (req, res) => {
    const id = parseInt(req.params.id)
    const category = await findOneQuery({ id })
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
}

const getCategoryByName = async (req, res) => {
    const name = req.params.name
    const category = await findOneQuery({ name })
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
}

const createCategory = async (req, res) => {
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

    const isCategoryValid = validateCreateCategory(categoryData)

    if (!isCategoryValid.valid) {
        return res.status(400).json({
            message: "Invalid category data",
            errors: isCategoryValid.errors,
        })
    }

    const createdCategory = await createQuery(categoryData)

    if (createdCategory) {
        return res.status(201).json({
            message: `Category added with ID: ${createdCategory.id}`,
            createdCategory,
        })
    } else {
        return res.status(500).json({ message: `Faile to create a category` })
    }
}

const updateCategory = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, username, about, title } = req.body

    const categoryData = {
        name,
        username,
        about,
        title,
    }

    const isCategoryValid = validateUpdateCategory(categoryData)

    if (!isCategoryValid) {
        res.status(400).json({ message: "Category not updated" })
    }

    const updatedCategory = await updateQuery(categoryData, { id })

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
}

const deleteCategory = async (req, res) => {
    const id = parseInt(req.params.id)
    await deleteQuery({ id })
    res.status(200).json({ message: `Category deleted with ID: ${id}` })
}

export {
    getCategories,
    getCategoryById,
    getCategoriesByType,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
}
