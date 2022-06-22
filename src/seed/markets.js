import { faker } from "@faker-js/faker";
import { Market } from "../models/index.js";
import slugify from "slugify";
import { randomNumber } from "../utils/index.js";

export const createFakeMarkets = async () => {
    const fakeMarkets = [];
    for (let index = 0; index < 5; index++) {
        const title = faker.lorem.sentence();
        fakeMarkets.push({
            name: faker.random.word(),
            slug: slugify(title),
            title,
            about: faker.lorem.paragraph(),
            UserId: randomNumber(1, 5),
        });
    }

    await Market.bulkCreate(fakeMarkets);
};
