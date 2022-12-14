import { faker } from "@faker-js/faker"
import { Comment } from "../models/index.js"
import slugify from "slugify"
import { randomNumber } from "../utils/index.js"

export default {
    createFake: async (record) => {
        const fakeComments = []
        for (let index = 0; index < record; index++) {
            fakeComments.push({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                UserId: randomNumber(1, record),
            })
        }

        // await Comment.bulkCreate(fakeComments);
    },
}
