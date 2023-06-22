class Insert {
    constructor(db){
        this.db = db
    }
addGuild = (id, name, ticker, AlertReputationThreshold, BanReputationThreshold, AdminRole, Milsim, reputation = 0) => {
    this.db.run(`
    INSERT INTO Guilds VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        id, name, ticker, reputation, AlertReputationThreshold, BanReputationThreshold, AdminRole, Milsim
    ])
}

addUser = (id, lastname, nuker, raider, spy, nukebot, reputation = 0) => {
    this.db.run(`
    INSERT INTO Users VALUES (
        ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        id, reputation, lastname, nuker, raider, spy, nukebot
    ])
}

addAlt = (main, alt) => {
    this.db.run(`
    INSERT INTO Alts VALUES (
        NULL, ?, ?
    )
    `, [
        main, alt
    ])
}

addGuildUser = (user, guild, owner, hicom) => {
    this.db.run(`
    INSERT INTO GuildUsers VALUES (
        NULL, ?, ?, ?, ?
    )
    `, [
        user, guild, owner, hicom
    ])
}

addAlert = (alert, guild) => {
    this.db.run(`
    INSERT INTO Alerts VALUES (
        Null, ?, ?
    )
    `, [
        alert, guild
    ])
}

addGuildEvent = (event, timestamp, info, guild) => {
    this.db.run(`
    INSERT INTO GuildEvents VALUES (
        NULL, ?, ?, ?, ?
    )
    `, [
        event, timestamp, info, guild
    ])
}

addWar = (reporter, enemy, timestamp, info, proof, reporterrepchange, enemyrepchange, active) => {
    this.db.run(`
    INSERT INTO Wars VALUES (
        NULL, ?, ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        reporter, enemy, timestamp, info, proof, reporterrepchange, enemyrepchange, active
    ])
}

addRaid = async (reporter, enemy, timestamp, info, proof, reporterrepchange, enemyrepchange) => {
    await this.db.run(`
    INSERT INTO Raids VALUES (
        NULL, ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        reporter, enemy, timestamp, info, proof, reporterrepchange, enemyrepchange
    ])
    raidID = await this.db.get(`SELECT raiduserid FROM Raids ORDER BY raiduserid DESC LIMIT 1`)
    return raidID.raiduserid
}

addRaidUser = (user, raid) => {
    this.db.run(`
    INSERT INTO RaidUsers VALUES (
        NULL, ?, ?
    )
    `, [user, raid])
}

addInterGuildEvent = async (event, info, timestamp, guilda, guildb, proof, guildarepchange, guildbrepchange) => {
    await this.db.run(`
    INSERT INTO InterGuildEvents VALUES (
        NULL, ?, ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        event, info,  timestamp, guilda, guildb, proof, guildarepchange, guildbrepchange
    ])
    eventID = await this.db.get(`SELECT EventID FROM InterGuildEvents ORDER BY eventid DESC LIMIT`)
    return eventID.eventid
}

addEventUser = (user, event) => {
    this.db.run(`
    INSERT INTO EventUsers VALUES (
        NULL, ?, ?
    )
    `, [
        user, event
    ])
}
}
module.exports = Insert