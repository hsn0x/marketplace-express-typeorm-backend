import { createFakeStudents } from "./students.js";
import { createFakeUsers } from "./users.js";
import { createFakeProducts } from "./products.js";
import { createFakeCategories } from "./categories.js";
import { createFakeMarkets } from "./markets.js";
import { createFakeImages } from "./Image.js";
import { createFakeComments } from "./comments.js";

export const dbSeed = async () => {
    await createFakeUsers();
    await createFakeCategories();
    await createFakeMarkets();
    await createFakeProducts();
    // await createFakeImages();
    await createFakeComments();
    // await createFakeStudents();
};
