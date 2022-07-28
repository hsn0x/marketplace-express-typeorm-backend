import { Permission, Role } from "../models/index.js"
import { PERMISSIONS_CONSTANTS, ROLES_CONSTANTS } from "../constants/index.js"
import { findAllRolesQuery, findOneRoleQuery } from "../queries/roles.js"
import { findOnePermissionQuery } from "../queries/permissions.js"

export const createPermissions = async () => {
    await Permission.bulkCreate(PERMISSIONS_CONSTANTS)

    for (let index = 0; index < ROLES_CONSTANTS.length; index++) {
        const ROLE = ROLES_CONSTANTS[index]
        const permissions = ROLE.permissions
        for (let index = 0; index < permissions.length; index++) {
            const permission = permissions[index]
            const perm = await findOnePermissionQuery({ name: permission })
            const Role = await findOneRoleQuery({ name: ROLE.name })
            await Role.addPermission(perm.id)
        }
    }
}
