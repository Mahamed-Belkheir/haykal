const fse = require('fs-extra');
const pluralize = require("pluralize");

const { expressResourceRouter, expressDefaultRouter } = require('../templates/applications/express/templates');

async function generateRoute(name, application, resource, api) {
    let template;
    switch (application) {
        case "express": {
            if (resource)
                template = expressResourceRouter(name)
            else
                template = expressDefaultRouter()
            break;

        }
        default: {
            throw Error("can not generate route without an application layer")
        }
    }
    if (resource)
        name = pluralize(name)
    name = name.toLowerCase();
    await fse.outputFile(`./src/application/${application}/api/${api}/${name}.ts`, template);
}

module.exports = {
    generateRoute,
}