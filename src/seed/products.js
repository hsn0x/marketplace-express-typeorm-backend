import { faker } from "@faker-js/faker";
import { Product } from "../models/index.js";

export const createFakeProducts = async () => {
    const fakeProducts = [];
    for (let index = 0; index < 5; index++) {
        fakeProducts.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
        });
    }

    await Product.bulkCreate(fakeProducts);
};
