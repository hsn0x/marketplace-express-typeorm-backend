import { faker } from "@faker-js/faker";
import { Comment } from "../models/index.js";
import slugify from "slugify";
import { randomNumber } from "../utils/index.js";

export const createFakeComments = async () => {
    const fakeComments = [];
    for (let index = 0; index < 5; index++) {
        fakeComments.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
        });
    }

    await Comment.bulkCreate(fakeComments);
};
