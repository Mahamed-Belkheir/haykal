const resourceInterface = () => (``);

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