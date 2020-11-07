const fse = require('fs-extra');
const { resourceInterface } = require('../templates/interfaces/resource');

async function generateInterface(name, attributes) {
    await fse.outputFile(
        `./src/models/interfaces/${name.toLowerCase()}.ts`, 
        resourceInterface(name, attributes)
        )
}

module.exports = {
    generateInterface,
}