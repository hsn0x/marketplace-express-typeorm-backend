import { Role } from "../models/index.js"
import { ROLES_CONSTANTS } from "../constants/index.js"

export const createRoles = async () => {
    await Role.bulkCreate(ROLES_CONSTANTS.ROLES)
}
