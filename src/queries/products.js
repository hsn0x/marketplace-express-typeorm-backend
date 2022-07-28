import { Op } from "sequelize"
import { ProductScope } from "../scopes/index.js"
import { Category } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, params) => {
        const { limit, offset } = getPagination(params.page, params.size)

        const rows = await ProductScope.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await ProductScope.count()
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
        const record = await ProductScope.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await ProductScope.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const recordCreated = await ProductScope.create(data)
        console.log(recordCreated.id)
        data.CategoriesIds.map(
            async (ci) => await recordCreated.addCategory(ci)
        )
        return recordCreated
    },

    update: async (data, where) => {
        await ProductScope.update(data, { where })
        const recordUpdated = await ProductScope.scope(scope).findOne(filter)
        recordUpdated.categories.map(
            async (c) => await recordUpdated.removeCategory(c.id)
        )
        data.CategoriesIds.map(
            async (ci) => await recordUpdated.addCategory(ci)
        )

        return recordUpdated
    },

    remove: async (filter, scope) => {
        const recordDeleted = await ProductScope.destroy(filter)

        return recordDeleted
    },
}
