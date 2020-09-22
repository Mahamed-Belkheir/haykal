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
    writeToFile("src/application/express/v1/"+name+".ts", route())
}

function generateModel(name, attrs) {
    writeToFile("src/models/objection/"+name+".ts", model(name, attrs))
}

function generateMigration(name, attrs) {
    writeToFile("migrations/"+knexTimeStamp()+"_"+name +".js", migration(name, attrs))
}

function generateController(name) {
    writeToFile("src/controllers/"+name+".ts", controller(name))    
}

function generateInterface(name, attrs) {
    writeToFile("src/models/interface/"+name+".ts", interface(name, attrs))
}



function writeToFile(pathName, data) {
    fs.writeFileSync(path.join(process.cwd(),pathName), data)
}

module.exports = generateItem