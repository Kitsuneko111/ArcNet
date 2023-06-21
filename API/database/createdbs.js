const { db } = require("./databaseimports.js")
async function createDBs(){
    await db.run(`CREATE TABLE IF NOT EXISTS Guilds (
        GuildID VARCHAR(20) PRIMARY KEY NOT NULL,
        Name VARCHAR(255),
        Ticker VARCHAR(10),
        Reputation REAL,
        AlertReputationThreshold REAL,
        BanReputationThreshold REAL,
        AdminRole VARCHAR(255),
        Milsim BOOLEAN
    )`)
    await db.run(`CREATE TABLE IF NOT EXISTS Users (
        UserID VARCHAR(20) PRIMARY KEY NOT NULL,
        reputation REAL,
        lastName VARCHAR(32),
        Nuker BOOLEAN,
        Raider BOOLEAN,
        Spy BOOLEAN,
        NukeBot BOOLEAN
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS Alts (
        altEntryID INTEGER PRIMARY KEY AUTOINCREMENT,
        mainID VARCHAR(20),
        altID VARCHAR(20),
        FOREIGN KEY (mainID) REFERENCES Users(userid),
        FOREIGN KEY (altID) REFERENCES Users(userid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS GuildUsers (
        GuildUserID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID VARCHAR(20) NOT NULL,
        guildid VARCHAR(20) NOT NULL,
        Owner BOOLEAN,
        HiCom BOOLEAN,
        FOREIGN KEY (userid) REFERENCES Users(userid),
        FOREIGN KEY (guildid) REFERENCES Guilds(guildid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS Alerts (
        AlertID INTEGER PRIMARY KEY AUTOINCREMENT,
        Alert VarChar(64),
        guildid VARCHAR(20),
        FOREIGN KEY (guildid) REFERENCES Guilds(guildid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS GuildEvents (
        GuildEventID INTEGER PRIMARY KEY AUTOINCREMENT,
        Event VarChar(128),
        Timestamp INTEGER,
        INFO VARCHAR(255),
        guildid VARCHAR(20),
        FOREIGN KEY (guildid) REFERENCES Guilds(guildid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS Wars (
        WarID INTEGER PRIMARY KEY AUTOINCREMENT,
        Reporter VARCHAR(20),
        Enemy VARCHAR(20),
        timestamp INTEGER,
        info VARCHAR(255),
        proof VARCHAR(255),
        reporterrepchange INTEGER,
        enemyrepchange INTEGER,
        active BOOLEAN,
        FOREIGN KEY (Reporter) REFERENCES Guilds(guildid),
        FOREIGN KEY (Enemy) REFERENCES Guilds(guildid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS Raids (
        RaidID INTEGER PRIMARY KEY AUTOINCREMENT,
        reporter VARCHAR(20),
        enemy VARCHAR(20),
        timestamp INTEGER,
        info VARCHAR(255),
        proof VARCHAR(255),
        reporterrepchange INTEGER,
        enemyrepchange INTEGER,
        FOREIGN KEY (reporter) REFERENCES Guilds(guildid),
        FOREIGN KEY (enemy) REFERENCES Guilds(guildid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS RaidUsers (
        RaidUserID INTEGER PRIMARY KEY AUTOINCREMENT,
        userid VARCHAR(20),
        raidid INTEGER,
        FOREIGN KEY (userid) REFERENCES Users(userid),
        FOREIGN KEY (raidid) REFERENCES Raids(raidid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS InterGuildEvents (
        EventID INTEGER PRIMARY KEY AUTOINCREMENT,
        event VARCHAR(128),
        info varchar(255),
        timestamp INTEGER,
        GuildAID Varchar(20),
        GuildBID Varchar(20),
        proof varchar(255),
        GuildARepChange INTEGER,
        GuildBRepChange INTEGER,
        FOREIGN KEY (guildaid) REFERENCES Guilds(guildid),
        FOREIGN KEY (guildbid) REFERENCES Guilds(guildid)
        )`)
    await db.run(`CREATE TABLE IF NOT EXISTS EventUsers(
        EventUserID INTEGER PRIMARY KEY AUTOINCREMENT,
        userid VARCHAR(20),
        eventid INTEGER,
        FOREIGN KEY (userid) REFERENCES Users(userid),
        FOREIGN KEY (eventid) REFERENCES InterGuildEvents(eventid)
        )`)
    }
createDBs()