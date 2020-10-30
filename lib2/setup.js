const fse = require("fs-extra");
const exceptions = require("../lib/templates/exceptions");
const { expressIndex, expressError, expressRouter } = require("./templates/applications/express/setup");
const { packageJson, tsConfig, jestConfig, ignore } = require("./templates/config");
const { knexfile, connection } = require("./templates/database/objection");
const { dependencyIndex } = require("./templates/dependency");
const { resourceInterfaceBase } = require("./templates/interfaces/resource");
const { objectionModelBase } = require("./templates/models/objection");

async function setupApplication(project, application) {
    switch(application) {
        case "express": {
            await setupExpress(project);
        }
        default: {
            return;
        }
    }
}

async function setupExpress(project) {
    await fse.outputFile(`./${project}/src/application/express/index.ts`, expressIndex());
    await fse.outputFile(`./${project}/src/application/express/error.ts`, expressError());
    await fse.outputFile(`./${project}/src/application/express/api/index.ts`, expressRouter());
    await fse.outputFile(`./${project}/src/application/express/api/v1/index.ts`, expressRouter());
}

async function setupInterface(project) {
    await fse.outputFile(`./${project}/src/models/interface/base.ts`, resourceInterfaceBase());
}

async function setupDB(project, db) {
    switch (db) {
        case "objection": {
            await setupObjectionDB(project)
        }
        default: {
            return;
        }
    }
}

async function setupObjectionDB(project) {
    await fse.outputFile(`./${project}/knexfile.js`, knexfile());
    await fse.outputFile(`./${project}/src/db/objection/index.ts`, connection());
    await fse.outputFile(`./${project}/src/models/objection/base.ts`, objectionModelBase());
    await fse.ensureDir(`./${project}/migrations`);
}

async function setupConfigs(project) {
    await fse.outputFile(`./${project}/package.json`, packageJson());
    await fse.outputFile(`./${project}/tsconfig.json`, tsConfig());
    await fse.outputFile(`./${project}/jest.config.js`, jestConfig());
    await fse.outputFile(`./${project}/.gitignore`, ignore());
    await fse.outputFile(`./${project}/.dockerignore`, ignore());
}

async function setupDependency(project) {
    await fse.outputFile(`./${project}/src/dependency/index.ts`, dependencyIndex());
}

async function setupExceptions(project) {
    await fse.outputFile(`./${project}/src/exceptions/index.ts`, exceptions())
}

module.exports = {
    setupDB,
    setupInterface,
    setupConfigs,
    setupApplication,
    setupDependency,
    setupExceptions,
}