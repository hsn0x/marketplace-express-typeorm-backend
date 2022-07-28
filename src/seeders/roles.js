import { Role } from "../models/index.js"
import { ROLES_CONSTANTS } from "../constants/index.js"

export default {
    create: async () => {
        await Role.bulkCreate(ROLES_CONSTANTS.ROLES)
    },
}
