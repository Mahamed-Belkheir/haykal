const fse = require('fs-extra');
const { generateInterface } = require('./interface');

async function generateModel(name, attributes, db) {
    switch (db) {
        case "objection": {
            let { objectionModel } = require('../templates/models/objection');
            await fse.outputFile(`./src/models/objection/${name.toLowerCase()}.ts`,
                objectionModel(name, attributes));
            break;
        }
        default: {
            throw Error("Can't generate model with no database layer");
        }
    }
    await generateInterface(name, attributes)
    let dep = await fse.readFile('./src/dependency/index.ts', {encoding: "utf-8"});
    dep = `import { ${name}Model } from '../models/${db}/${name.toLowerCase()}'\n` + dep;
    dep =  dep.replace("export const models = {", 
            `export const models = {\n\t${name.toLowerCase()}:\tnew ${name}Model(),\n`)
    await fse.outputFile('./src/dependency/index.ts', dep);
}

module.exports = {
    generateModel,
}