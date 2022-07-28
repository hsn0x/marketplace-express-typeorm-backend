import { Resource } from "../models/index.js"
import { RESOURCES_CONSTANTS } from "../constants/index.js"
import { findAllPermissionsQuery } from "../queries/permissions.js"
import { findAllResourcesQuery } from "../queries/resources.js"

export const createResources = async () => {
    await Resource.bulkCreate(RESOURCES_CONSTANTS)
    const permissions = await findAllPermissionsQuery()
    for (
        let permissionIndex = 0;
        permissionIndex < permissions.length;
        permissionIndex++
    ) {
        const permission = permissions[permissionIndex]
        const resources = await findAllResourcesQuery()
        for (
            let resourceIndex = 0;
            resourceIndex < resources.length;
            resourceIndex++
        ) {
            const resource = resources[resourceIndex]
            await permission.addResource(resource.id)
        }
    }
}
