const fse = require("fs-extra");

async function createConfig(projectName, version, application, dblayer) {
    await fse.outputJson(`./${projectName}/haykal.json`, {
        version,
        "project-name": projectName,
        "application": application,
        "database": dblayer,
        "api": "v1",
    }, {spaces: 4})
}

async function readConfig() {
    return fse.readJson('./haykal.json')
}




module.exports = {
    createConfig,
    readConfig,
}