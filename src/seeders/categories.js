import { faker } from "@faker-js/faker";
import { Category } from "../models/index.js";
import slugify from "slugify";

export const createFakeCategories = async (record) => {
    const fakeCategories = [];
    for (let index = 0; index < record; index++) {
        const name = faker.random.word() + faker.random.word();
        fakeCategories.push({
            name,
            description: faker.lorem.sentence(),
            UserId: 1,
        });
    }

    const categories = await Category.bulkCreate(fakeCategories);

    for (let index = 0; index < record; index++) {
        const category = categories[index];
        await category.createImage({
            public_id: faker.random.word(),
            url: faker.image.image(),
        });
    }
    for (let index = 0; index < record; index++) {
        const category = categories[index];
        await category.createAvatar({
            public_id: faker.random.word(),
            url: faker.image.avatar(),
        });
    }
};
