import { Op } from "sequelize"
import { Permission } from "../scopes/index.js"
import { Category } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, { page, size }) => {
        const { limit, offset } = getPagination(page, size)

        const rows = await Permission.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await Permission.count()
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
        const record = await Permission.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await Permission.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const recordCreated = await Permission.create(data)
        console.log(recordCreated.id)
        data.CategoriesIds.map(
            async (ci) => await recordCreated.addCategory(ci)
        )
        return recordCreated
    },

    update: async (data, where) => {
        await Permission.update(data, { where })
        const recordUpdated = await Permission.scope(scope).findOne(filter)
        recordUpdated.categories.map(
            async (c) => await recordUpdated.removeCategory(c.id)
        )
        data.CategoriesIds.map(
            async (ci) => await recordUpdated.addCategory(ci)
        )

        return recordUpdated
    },

    remove: async (filter, scope) => {
        const recordDeleted = await Permission.destroy(filter)

        return recordDeleted
    },
}
