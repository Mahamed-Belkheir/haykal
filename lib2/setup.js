const fse = require("fs-extra");
const exceptions = require("../lib/templates/exceptions");
const { expressIndex, expressError, expressRouter } = require("./templates/applications/express/setup");
const { packageJson, tsConfig, jestConfig, ignore } = require("./templates/config");
const { knexfile, connection } = require("./templates/database/objection");
const { dependencyIndex } = require("./templates/dependency");
const { resourceInterfaceBase } = require("./templates/interfaces/resource");
const { objectionModelBase } = require("./templates/models/objection");
const childProcess = require("child_process");
const { promisify } = require('util')

const exec = promisify(childProcess.exec);

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
    await fse.outputFile(`./${project}/package.json`, packageJson(project));
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

const defaultPackages = {
    dep: [],
    dev: [ "typescript", 
            "nodemon", 
            "ts-jest", 
            "supertest", 
            "jest", 
            "@types/node", 
            "@types/jest"
        ],
}

const applicationPackages = {
    express: {
        dep: ["express"],
        dev: ["@types/express"],
    }
}

const databasePackages = {
    objection: {
        dep: ["objection", "knex"],
        dev: ["sqlite3"]
    }
}

async function setupNPMDependencies(project, application, database) {
    let dep = [...defaultPackages.dep];
    let dev = [...defaultPackages.dev];
    if (databasePackages[database]) {
        dep = [...dep, ...databasePackages[database].dep]
        dev = [...dev, ...databasePackages[database].dev]
    }
    if (applicationPackages[application]) {
        dep = [...dep, ...applicationPackages[application].dep]
        dev = [...dev, ...applicationPackages[application].dev]
    }
    return exec(`cd ${project} && npm i ${dep.join(" ")} && npm i -D ${dev.join(" ")}`)
}

module.exports = {
    setupDB,
    setupInterface,
    setupConfigs,
    setupApplication,
    setupDependency,
    setupExceptions,
    setupNPMDependencies,
}