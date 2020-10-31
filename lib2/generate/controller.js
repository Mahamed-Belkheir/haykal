const fse = require('fs-extra');
const { resourceController, controller } = require('../templates/controllers/resource');

async function generateController(name, resource) {
    if (resource)
        await fse.outputFile(`./src/controller/${name.toLowerCase()}.ts`, resourceController(name))
    else
        await fse.outputFile(`./src/controller/${name.toLowerCase()}.ts`, controller(name))
    
    let dep = await fse.readFile('./src/dependency/index.ts', { encoding: "utf-8" });
    dep = `import {${name}Controller} from '../controller/${name.toLowerCase()}.ts\n` + dep;
    if (resource)
        dep = dep.replace("export const controllers = {",
            `export const controllers = {\n\t${name.toLowerCase()}: new ${name}Controller(models.${name.toLowerCase()}),\n`);
    else 
        dep = dep.replace("export const controllers = {",
            `export const controllers = {\n\t${name.toLowerCase()}: new ${name}Controller(),\n`);
    
    await fse.outputFile('./src/dependency/index.ts', dep);
}

module.exports = {
    generateController,
}