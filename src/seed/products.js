import { faker } from "@faker-js/faker";
import { Product } from "../models/index.js";
import { randomNumber } from "../utils/index.js";
import slugify from "slugify";

export const createFakeProducts = async () => {
    const fakeProducts = [];
    for (let index = 0; index < 5; index++) {
        const title = faker.commerce.productName();
        fakeProducts.push({
            title,
            slug: slugify(title),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            CategoryId: randomNumber(1, 5),
            MarketId: randomNumber(1, 5),
            UserId: randomNumber(1, 5),
        });
    }

    await Product.bulkCreate(fakeProducts);
};
