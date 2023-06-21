
const sqlite3 = require("sqlite3")
const { open } = require("sqlite");

const db = new sqlite3.Database("./API/database/database.db")

module.exports = {sqlite3: sqlite3, open: open, db: db}