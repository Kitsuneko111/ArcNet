
const sqlite3 = require("sqlite3")
const sqlite = require("sqlite");

const db = new sqlite.Database({filename: "./API/database/database.db", driver: sqlite3.Database})
db.open()

module.exports = {sqlite3: sqlite3, db: db}