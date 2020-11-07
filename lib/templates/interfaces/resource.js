const typeMap = {
    "string":       'string',
    "number":       'number',
    "boolean":      'boolean',
    "date":         'Date',
    "increments":   'number'
};

const resourceInterface = (name, attributes) => (`import BaseInterface from "./base";

export interface ${name} {
    ${Object.entries(attributes).map(([key, value]) => {
        return `${key}:\t\t\t${typeMap[value]}`
    }).join("\n\t")}
}

export interface ${name}ModelInterface extends BaseInterface<${name}> {

}`);

const resourceInterfaceBase = () => (`export default interface BaseInterface<T> {
    create(data: Omit<T, "id">): Promise<void>
    read(data: Partial<T>, join?: string[], exclude?: string[]): Promise<T[]>
    update(id: Number, query: Partial<T>): Promise<void>
    delete(id: Number): Promise<void>
} `);

module.exports = {
    resourceInterface,
    resourceInterfaceBase,
}