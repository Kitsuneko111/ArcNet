const Insert = require("./queryutil/insert")
const Update = require("./queryutil/update")
const Select = require("./queryutil/select")
const Delete = require("./queryutil/delete")
const {db} = require("./databaseimports")

class Database extends Insert {
    constructor(db){
        this.insert = Insert(db)
        this.update = Update(db)
        this.select = Select(db)
    }
}


const database = new Database(db)
module.exports = database