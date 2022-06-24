import { Permission, Role } from "../models/index.js";
import { PERMISSIONS } from "../constants/index.js";
import { findAllRolesQuery } from "../queries/roles.js";

export const createPermissions = async () => {
    await Permission.bulkCreate(PERMISSIONS);
    const roles = await findAllRolesQuery();
    for (let index = 0; index < roles.length; index++) {
        const role = roles[index];
        const permissions = await role.permissions;
        await role.addPermission();
    }
};
