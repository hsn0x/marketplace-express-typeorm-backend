import { findOneQuery } from "../queries/categories.js"

const isCategoryExist = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const category = await findOneQuery({ id })
    if (category) {
        return next()
    } else {
        return res.status(404).json({
            message: `Category not found with ID: ${id}`,
        })
    }
}

const isCategoryNameExist = async (req, res, next) => {
    const name = req.params.name
    const category = await findOneQuery({ name })
    if (category) {
        return next()
    } else {
        return res.status(404).json({
            message: `Category not found with ID: ${name}`,
        })
    }
}

export { isCategoryNameExist, isCategoryExist }
