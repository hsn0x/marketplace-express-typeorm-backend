import { Permission, Role } from "../models/index.js"
import { PERMISSIONS_CONSTANTS, ROLES_CONSTANTS } from "../constants/index.js"
import { rolesQueries, permissionsQueries } from "../queries/index.js"

export default {
    create: async () => {
        await Permission.bulkCreate(PERMISSIONS_CONSTANTS.PERMISSIONS)

        for (let index = 0; index < ROLES_CONSTANTS.length; index++) {
            const ROLE = ROLES_CONSTANTS[index]
            const permissions = ROLE.permissions
            for (let index = 0; index < permissions.length; index++) {
                const permission = permissions[index]
                const perm = await permissionsQueries.findOneQuery({
                    where: { name: permission },
                })
                const Role = await rolesQueries.findOneQuery({
                    where: {
                        name: ROLE.name,
                    },
                })
                await Role.addPermission(perm.id)
            }
        }
    },
}
