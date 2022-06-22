import { faker } from "@faker-js/faker";
import { Image, Product } from "../models/index.js";
import { cloudinary } from "../db/cloudinary.js";

export const createFakeImages = async () => {
    const fakeImages = [];
    for (let index = 0; index < 5; index++) {
        fakeImages.push({
            url: faker.image.imageUrl(),
        });
    }

    await Image.bulkCreate(fakeImages);
    const image = await Image.create({
        url: "https://placekitten.com/408/287",
    });
    const comment = await image.createComment({
        title: "Awesome!",
        content: "Awesome!",
    });

    console.log(comment.commentableId === image.id); // true

    console.log(comment.commentableType); // "Image"
};
