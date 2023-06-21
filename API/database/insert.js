const {db, sqlite} = require("./databaseimports")
addGuild = (id, name, ticker, AlertReputationThreshold, BanReputationThreshold, AdminRole, Milsim, reputation = 0) => {
    db.run(`
    INSERT INTO Guilds VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        id, name, ticker, reputation, AlertReputationThreshold, BanReputationThreshold, AdminRole, Milsim
    ])
}

addUser = (id, lastname, nuker, raider, spy, nukebot, reputation = 0) => {
    db.run(`
    INSERT INTO Users VALUES (
        ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        id, reputation, lastname, nuker, raider, spy, nukebot
    ])
}

addAlt = (main, alt) => {
    db.run(`
    INSERT INTO Alts VALUES (
        NULL, ?, ?
    )
    `, [
        main, alt
    ])
}

addGuildUser = (user, guild, owner, hicom) => {
    db.run(`
    INSERT INTO GuildUsers VALUES (
        NULL, ?, ?, ?, ?
    )
    `, [
        user, guild, owner, hicom
    ])
}

addAlert = (alert, guild) => {
    db.run(`
    INSERT INTO Alerts VALUES (
        Null, ?, ?
    )
    `, [
        alert, guild
    ])
}

addGuildEvent = (event, timestamp, info, guild) => {
    db.run(`
    INSERT INTO GuildEvents VALUES (
        NULL, ?, ?, ?, ?
    )
    `, [
        event, timestamp, info, guild
    ])
}

addWar = (reporter, enemy, timestamp, info, proof, reporterrepchange, enemyrepchange, active) => {
    db.run(`
    INSERT INTO Wars VALUES (
        NULL, ?, ?, ?, ?, ?, ?, ?, ?
    )
    `, [
        reporter, enemy, timestamp, info, proof, reporterrepchange, enemyrepchange, active
    ])
}
