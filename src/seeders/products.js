import { faker } from "@faker-js/faker";
import { Image, Product } from "../models/index.js";
import { randomNumber } from "../utils/index.js";
import slugify from "slugify";
import { findAllProductsQuery } from "../queries/products.js";
import axios from "axios";

export const createFakeProducts = async (record) => {
    const fakeProducts = [];
    for (let index = 0; index < record; index++) {
        fakeProducts.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            quantity: randomNumber(1, 100),
            CategoryId: randomNumber(1, record),
            // MarketId: randomNumber(1, record),
            MarketId: 1,
            UserId: randomNumber(1, record),
        });
    }

    const products = await Product.bulkCreate(fakeProducts);
    for (let productIndex = 0; productIndex < products.length; productIndex++) {
        const product = products[productIndex];

        for (
            let imageIndex = 0;
            imageIndex < randomNumber(1, 3);
            imageIndex++
        ) {
            const url = faker.image.imageUrl(600, 400, "Business", true);
            product.createImage({
                public_id: faker.random.word(),
                url,
            });
        }

        await product.addCategory(productIndex);
    }
};
