const package = require('../package.json')
const { Command } = require("commander");
const inq = require("inquirer");
const { createConfig, readConfig } = require('./config');
const { setupConfigs, setupApplication, setupInterface, setupDependency, setupDB, setupExceptions, setupNPMDependencies } = require("./setup");
const Listr = require('listr');
const fse = require('fs-extra');
const chalk = require('chalk');
const haykal = new Command();
const { generateController } = require('./generate/controller');
const { generateInterface } = require('./generate/interface');
const { generateMigration } = require('./generate/migration');
const { generateModel } = require('./generate/model');
const { generateRoute } = require('./generate/route');

haykal.version(package.version);

haykal.command("init <project-name>")
.action(async projectName => {
    console.log(chalk.green("Setting up new Haykal project"))
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
    new Listr([
        {
            title: "Creating project directory",
            task: () => (Promise.all([
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
            ]))
        },
        {
            title: "Installing dependencies",
            task: () => setupNPMDependencies(projectName, answers.application, answers.database)
        }
    ]).run()
})

function parseAttributes(input, previous) {
    let [key, value] = input.split(':');
    previous[key] = value;
    return previous;
}

haykal
.command("gen <component>")
.option("-c --controller")
.option("-m --model")
.option("-i --interface")
.option("-mi --migration")
.option("-r --route")
.option("-a --resource")
.option("--attributes [keyValue...]", "attribute:type pairs", parseAttributes, {})
.action(async (component, options) => {
    let attributes = {}
    let conf = await readConfig()
    component = component[0].toUpperCase() + component.slice(1);
    if (Object.keys(options.attributes).length == 0) {
        while(await getNextAttribute(attributes)) {}
    } else {
        attributes = options.attributes
    }
    if (options.resource) {
        await generateController(component, true);
        await generateInterface(component, attributes);
        await generateMigration(component, attributes, conf.database);
        await generateModel(component, attributes, conf.database);
        await generateRoute(component, conf.application, true, conf.api)
    } else {
        if (options.controller)
            await generateController(component, false);
        if (options.interface)
            await generateInterface(component, attributes);
        if (options.migration)
            await generateMigration(component, attributes, conf.database);
        if (options.route)
            await generateRoute(component, conf.application, false, conf.api);
        if (options.model)
            await generateModel(component, attributes, conf.database);
    }
    console.log(chalk.green("Generated component!"))
})

async function getNextAttribute(attributes) {
    let {key} = await inq.prompt([{
        message: "enter attribute name: (empty to exit)",
        type: "input",
        name: "key"
    }])
    if (!key) return false;
    let {value} = await inq.prompt([{
        message: "choose attribue value",
        type: "list",
        name: "value",
        choices: ["string", "number", "date", "boolean", {name: "primary", value: "increments"}]
    }])
    attributes[key] = value;
    return true;
}


haykal.parse(process.argv);