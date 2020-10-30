const package = require('../package.json')
const { Command } = require("commander");
const inq = require("inquirer");
const { createConfig, readConfig } = require('./config');
const { setupConfigs, setupApplication, setupInterface, setupDependency, setupDB, setupExceptions } = require("./setup");
const listr = require('listr');
const fse = require('fs-extra');

const haykal = new Command();
haykal.version(package.version);

haykal.command("init <project-name>")
.action(async projectName => {
    let answers = await inq.prompt([
        {   
            type: "list",
            message: "Application layer?",
            name: "application",
            choices: ["express", "none"],            
        },
        {
            type: "list",
            message: "Database layer?",
            name: "database",
            choices: ["objection", "none"],            
        }
    ])
    await Promise.all([
        createConfig(projectName, package.version, answers.application, answers.database),
        setupConfigs(projectName),
        setupApplication(projectName, answers.application),
        setupDB(projectName, answers.database),
        setupInterface(projectName),
        setupDependency(projectName),
        setupExceptions(projectName),
        fse.ensureDir(`./${projectName}/src/controllers`),
        fse.ensureDir(`./${projectName}/src/tests`),
        fse.ensureDir(`./${projectName}/src/services`)
    ])
})
// haykal
// .command("gen <component>")
// .option("-c --controller")
// .option("-m --model")
// .option("-i --interface")
// .option("-mi --migration")
// .option("-r --route")
// .option("-a --resource")
// .action((component, options) => {
//     console.log("generating component ", component);
//     console.log(options.controller)
// })

haykal.parse(process.argv);