import { createFakeStudents } from "./students.js";
import { createFakeUsers } from "./users.js";
import { createFakeProducts } from "./products.js";

export const dbSeed = async () => {
    await createFakeProducts();
    await createFakeUsers();
    await createFakeProducts();
};
