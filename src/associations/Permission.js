import { Permission, Role } from "../models/index.js";

Permission.belongsToMany(Role, {
    through: "role_permissions",
});

export default Permission;
