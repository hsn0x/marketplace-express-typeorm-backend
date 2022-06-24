import { faker } from "@faker-js/faker";
import { Category } from "../models/index.js";
import slugify from "slugify";

export const createFakeCategories = async () => {
    const fakeCategories = [];
    for (let index = 0; index < 5; index++) {
        const name = faker.random.word();
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
        });
    }

    await Category.bulkCreate(fakeCategories);
};
