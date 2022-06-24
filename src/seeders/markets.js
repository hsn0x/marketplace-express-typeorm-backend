import { faker } from "@faker-js/faker";
import { Market } from "../models/index.js";
import slugify from "slugify";
import { randomNumber } from "../utils/index.js";
import { findAllMarketsQuery } from "../queries/markets.js";

export const createFakeMarkets = async () => {
    const fakeMarkets = [];
    for (let index = 0; index < 5; index++) {
        fakeMarkets.push({
            name: faker.random.word(),
            username: faker.random.word(),
            title: faker.lorem.sentence(),
            about: faker.lorem.paragraph(),
            UserId: randomNumber(1, 5),
        });
    }

    await Market.bulkCreate(fakeMarkets);

    const markets = await findAllMarketsQuery([]);
    for (let index = 0; index < 5; index++) {
        const market = markets[index];
        await market.createImage({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(),
        });
    }
    for (let index = 0; index < 5; index++) {
        const market = markets[index];
        await market.createAvatar({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(),
        });
    }
};
