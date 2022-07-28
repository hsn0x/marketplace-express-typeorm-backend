import { Op } from "sequelize"
import { Category } from "../scopes/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, { page, size }) => {
        const { limit, offset } = getPagination(page, size)

        const rows = await Category.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await Category.count()
        const { totalItems, totalPages, currentPage } = getPagingData(
            count,
            page,
            limit
        )
        return {
            totalItems,
            totalPages,
            currentPage,
            count,
            rows,
        }
    },
    findByPkQuery: async (id, scope) => {
        const record = await Category.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await Category.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const recordCreated = await Category.create(data)
        console.log(recordCreated.id)
        data.CategoriesIds.map(
            async (ci) => await recordCreated.addCategory(ci)
        )
        return recordCreated
    },

    update: async (data, where) => {
        await Category.update(data, { where })
        const recordUpdated = await Category.scope(scope).findOne(filter)
        recordUpdated.categories.map(
            async (c) => await recordUpdated.removeCategory(c.id)
        )
        data.CategoriesIds.map(
            async (ci) => await recordUpdated.addCategory(ci)
        )

        return recordUpdated
    },

    remove: async (filter, scope) => {
        const recordDeleted = await Category.destroy(filter)

        return recordDeleted
    },
}
