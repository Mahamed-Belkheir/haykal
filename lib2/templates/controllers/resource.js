const controller = (name) => (`export class ${name}Controller {
    constructor(
       
    ) {}
}`);

const resourceController = (name) => (`import { ${name}ModelInterface, ${name} } from "../models/interface/${name.toLowerCase()}


export class ${name}Controller {
    constructor(
        private ${pluralize(name.toLowerCase())}: ${name}ModelInterface,
    ) {}

    public async read(query: Partial<${name}>) {
        return this.${pluralize(name.toLowerCase())}.read(query);
    }

    public async create(data: Omit<${name}, "id">) {
        await this.${pluralize(name.toLowerCase())}.create(data);
    }

    public async update(id: number, query: Partial<${name}>) {
        await this.${pluralize(name.toLowerCase())}.update(id, query);
    }

    public async delete(id: number) {
        await this.${pluralize(name.toLowerCase())}.delete(id);
    }
}`);