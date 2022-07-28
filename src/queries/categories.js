import { Category } from "../scopes/index.js"
export default {
    findAllQuery: async (filter, scope) => {
        const categories = await Category.scope(filter).findAll(filter)
        return categories
    },
    findAllWhereQuery: async (where) => {
        const categories = await Category.scope("withAssociations").findAll({
            where,
        })
        return categories
    },

    findByPkCategoryQuery: async (id) => {
        const category = await Category.scope("withAssociations").findByPk(id)
        return category
    },
    findOneCategoryQuery: async (where) => {
        const category = await Category.scope("withAssociations").findOne({
            where,
        })
        return category
    },

    createCategoryQuery: async (categoryData) => {
        const createdCategory = await Category.create(categoryData)
        return createdCategory
    },

    updateCategoryQuery: async (categoryData, where) => {
        const updatedCategory = await Category.update(categoryData, { where })
        return updatedCategory
    },

    deleteCategoryQuery: async (id) => {
        const deletedCategory = await Category.destroy({
            where: id,
        })

        return deletedCategory
    },
}
