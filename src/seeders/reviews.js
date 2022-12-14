import { faker } from "@faker-js/faker"
import { Review } from "../models/index.js"
import slugify from "slugify"
import { randomNumber } from "../utils/index.js"

export default {
    createFake: async (record) => {
        const fakeReviews = []
        for (let index = 0; index < record; index++) {
            fakeReviews.push({
                rate: randomNumber(0, 5),
                UserId: randomNumber(1, record),
            })
        }

        // await Review.bulkCreate(fakeReviews);
    },
}
