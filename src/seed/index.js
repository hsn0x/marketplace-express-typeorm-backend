import { createFakeStudents } from "./students.js";
import { createFakeUsers } from "./users.js";
import { createFakeProducts } from "./products.js";
import { createFakeCategories } from "./categories.js";
import { createFakeMarkets } from "./markets.js";

export const dbSeed = async () => {
    await createFakeUsers();
    await createFakeCategories();
    await createFakeMarkets();
    await createFakeProducts();
    // await createFakeStudents();
};
