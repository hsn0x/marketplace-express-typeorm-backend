import fs from "fs"
import path from "path"
import Sequelize from "sequelize"
import { typeormConfig } from "../config/index.js"
import { runSQLFile } from "../lib/SQLQuery.js"

console.log(typeormConfig)

const citiesSQLPath = path.resolve("src", "sql", "cities.sql")
const countriesSQLPath = path.resolve("src", "sql", "countries.sql")
const statesSQLPath = path.resolve("src", "sql", "states.sql")
const worldSQLPath = path.resolve("src", "sql", "world.sql")

const citiesSQL = fs.readFileSync(citiesSQLPath, "utf8")
const countriesSQL = fs.readFileSync(countriesSQLPath, "utf8")

const statesSQL = fs.readFileSync(statesSQLPath, "utf8")
const worldSQL = fs.readFileSync(worldSQLPath, "utf8")

const { database, username, password, type, host, port } = typeormConfig

const typeorm = new DataSource({
    database,
    username,
    password,
    type,
    host,
    port,
})

export default typeorm
