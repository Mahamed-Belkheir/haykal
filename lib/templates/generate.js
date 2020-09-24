fName = (name) => name[0].toUpperCase() + name.slice(1)

module.exports.interface = (name, attrs) => `import BaseInterface from "./base";

export interface ${fName(name)} {
    ${Object.entries(attrs).map(([key, val]) => key +": " +val).join('\n\t')}
}

export interface ${fName(name)}ModelInterface extends BaseInterface<${fName(name)}> {

}`

const schemaMap = {
    string: "string",
    number: "number",
    Date: "string\", format: \"datetime"
}

module.exports.model = (name, attrs) => `import { Model, BaseModel } from "./base";
import { ${fName(name)}, ${fName(name)}ModelInterface } from "../interface/${name}";

export class ${fName(name)}ObjectionModel extends Model implements ${fName(name)} {
    ${Object.entries(attrs).map(([key, val]) => key +": " +val).join('\n\t')}

    static tableName = "${name}";
    static jsonSchema = {
        type: "object",
        attributes: {
            ${Object.entries(attrs).map(([key, val]) => key +":\t\t" +`{ type: "${schemaMap[val]}" },` ).join('\n\t\t\t')}
        }
    }
}

export class ${fName(name)}Model extends BaseModel<${fName(name)}> implements ${fName(name)}ModelInterface {
    model = ${fName(name)}ObjectionModel
}`

// console.log(module.exports.model("user", {name: "string", age: "number"}))

module.exports.controller = (name) => `import { ${fName(name)}, ${fName(name)}ModelInterface } from "../models/interface/${name}";

export class ${fName(name)}Controller {
    constructor(
        private ${name}: ${fName(name)}ModelInterface,
    ) {};

    public async create(${name}Data: Omit<${fName(name)}, "id">) {
        await this.${name}.create(${name}Data);
    }

    public async read(${name}Data: Partial<${fName(name)}>) {
        return this.${name}.read(${name}Data);
    }

    public async update(id: number, ${name}Data: Partial<${fName(name)}>) {
        await this.${name}.update(id, ${name}Data);
    }

    public async delete(id: number) {
        await this.${name}.delete(id);
    }
}`


module.exports.route = (name) => `import { Router } from 'express';
import { controllers } from "../../../../dependency";

const router = Router()

router.get('/', async(req, res, next) => {
    try {
        let result = await controllers.${name}.read(req.body)
        res.send({result})
    } catch (e) {
        next(e);
    }
})

router.post('/', async(req, res, next) => {
    try {
        await controllers.${name}.create(req.body)
        res.send({
            status: "success",
        })
    } catch (e) {
        next(e);
    }
})

router.patch('/:id', async(req, res, next) => {
    try {
        let id = Number(req.params.id);
        await controllers.${name}.update(id, req.body)
        res.send({
            status: "success",
        })
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = Number(req.params.id);
        await controllers.${name}.delete(id)
        res.send({
            status: "success",
        })
    } catch (e) {
        next(e);
    }
})

export default router
`

const migrationMap = {
    number: "integer",
    string: "string",
    Date: "datetime",
}

module.exports.migration = (name, attrs) => `exports.up = function(knex) {
    return knex.schema
    .createTable("${name}", (table) => {
        table.increments("id").primary();
        ${Object.entries(attrs).map(([key, val]) => `table.${migrationMap[val]}("${key}")`).join('\n\t\t')}
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTable("${name}")
  };
`
