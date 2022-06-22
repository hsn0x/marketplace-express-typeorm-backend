import { faker } from "@faker-js/faker";
import { Product } from "../models/index.js";
import { randomNumber } from "../utils/index.js";
import slugify from "slugify";
import { findAllProductsQuery } from "../queries/products.js";

export const createFakeProducts = async () => {
    const fakeProducts = [];
    for (let index = 0; index < 5; index++) {
        fakeProducts.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            CategoryId: randomNumber(1, 5),
            MarketId: randomNumber(1, 5),
            UserId: randomNumber(1, 5),
        });
    }

    await Product.bulkCreate(fakeProducts);

    const products = await findAllProductsQuery([]);
    for (let index = 0; index < 5; index++) {
        const product = products[index];
        await product.createImage({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(),
        });
    }
};
