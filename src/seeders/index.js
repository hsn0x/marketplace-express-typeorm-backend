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
import { seedersConfig } from "../config/seeders.js";

const RECORD = seedersConfig.amount;

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
    await createFakeUsers(RECORD);
    await createFakeCategories(RECORD);
    await createFakeMarkets(RECORD);
    await createFakeProducts(RECORD);
    // await createFakeImages(RECORD);
    await createFakeComments(RECORD);

    // await createFakeStudents(RECORD);
};

export { dbSeed, dbSeedFake };
