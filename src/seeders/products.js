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
            CategoryId: randomNumber(1, record),
            MarketId: randomNumber(1, 5),
            UserId: randomNumber(1, 5),
        });
    }

    const products = await Product.bulkCreate(fakeProducts);
    Array.from(products, (product) =>
        Array.from({ length: randomNumber(1, 5) }, () =>
            product.createImage({
                public_id: faker.random.word(),
                url: faker.image.image(),
            })
        )
    );

    // for (let productIndex = 0; productIndex < products.length; productIndex++) {
    //     const proudct = products[productIndex];

    //     for (
    //         let imageIndex = 0;
    //         imageIndex < randomNumber(1, 5);
    //         imageIndex++
    //     ) {
    //         await proudct.createImage({
    //             public_id: faker.random.word(),
    //             url: faker.image.image(),
    //         });
    //     }
    // }
};
