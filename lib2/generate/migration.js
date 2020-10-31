const fse = require('fs-extra');

async function generateMigration(name, attributes, db) {
    switch (db) {
        case "objection": {
            let { objectionMigration, objectionMigrationFileName } = require("../templates/migrations/objection")
            await fse.outputFile("./migrations/"+objectionMigrationFileName(name)+".js", 
                    objectionMigration(name, attributes));
            break;
        }
        default: {
            throw Error("Can't generate migration with no database layer");
        }
    }
}

module.exports = {
    generateMigration,
}