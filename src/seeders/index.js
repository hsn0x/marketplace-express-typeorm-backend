import { createFakeStudents } from "./students.js";
import { createFakeUsers, createUsers } from "./users.js";
import { createFakeProducts } from "./products.js";
import { createFakeCategories } from "./categories.js";
import { createFakeMarkets } from "./markets.js";
import { createFakeImages } from "./Image.js";
import { createFakeComments } from "./comments.js";
import { createRoles } from "./roles.js";
import { createPermissions } from "./permissions.js";
import { createResources } from "./resources.js";

/**
 *
 */
const dbSeed = async () => {
    await createRoles();
    await createPermissions();
    await createResources();
    await createUsers();
};

/**
 *
 */
const dbSeedFake = async () => {
    await createFakeUsers();
    await createFakeCategories();
    await createFakeMarkets();
    await createFakeProducts();
    // await createFakeImages();
    await createFakeComments();

    // await createFakeStudents();
};

export { dbSeed, dbSeedFake };
