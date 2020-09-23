const { controller, interface, migration, model, route } = require('./templates/generate')
const fs = require('fs');
const path = require('path');
const knexTimeStamp = require('./timestamp');

/*
    c = controller
    i = interface
    mi = migration
    m = model
    r = route
*/

function generateItem(name, attrs, flags) {
    if (flags.has("c"))
        generateController(name)
    if (flags.has("i"))
        generateInterface(name, attrs)
    if (flags.has("mi"))
        generateMigration(name, attrs)
    if (flags.has("m"))
        generateModel(name, attrs)
    if (flags.has("r"))
        generateRoute(name)
    
}

function generateRoute(name) {
    writeToFile("src/application/express/api/v1/"+name+".ts", route(name))
}

fName = (name) => name[0].toUpperCase() + name.slice(1)

function generateModel(name, attrs) {
    writeToFile("src/models/objection/"+name+".ts", model(name, attrs));
    let code = readfromFile("src/dependency/index.ts");
    code = `import { ${fName(name)}Model } from "../models/objection/${name}";\n` + code;
    code = code.replace("export const models = {", `export const models = {\n\t${name}: new ${fName(name)}Model(),\n`);
    writeToFile("src/dependency/index.ts", code);

}

function generateMigration(name, attrs) {
    writeToFile("migrations/"+knexTimeStamp()+"_"+name +".js", migration(name, attrs))
}

function generateController(name) {
    writeToFile("src/controllers/"+name+".ts", controller(name));
    let code = readfromFile("src/dependency/index.ts");
    code = `import { ${fName(name)}Controller } from "../controllers/${name}";\n\n\n` + code;
    code = code.replace("export const controllers = {", `export const controllers = {\n\t${name}: new ${fName(name)}Controller(models.${name}),\n`);
    writeToFile("src/dependency/index.ts", code);    
}

function generateInterface(name, attrs) {
    writeToFile("src/models/interface/"+name+".ts", interface(name, attrs))
}

function readfromFile(pathName) {
    return fs.readFileSync(path.join(process.cwd(),pathName), {encoding: "utf8"});
} 

function writeToFile(pathName, data) {
    fs.writeFileSync(path.join(process.cwd(),pathName), data)
}

module.exports = generateItem