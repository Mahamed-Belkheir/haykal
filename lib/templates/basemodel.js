module.exports.interface = function() {
    return 
`
export default interface baseInterface<T> {
    create(data: Omit<T, "id">): Promise<void>
    read(data: Partial<T>, join?: string[], exclude?: string[]): Promise<T[]>
    update(id: Number, query: Partial<T>): Promise<void>
    delete(id: Number): Promise<void>
}
`
}

module.exports.model = function() {
    return 
`
import Base from '../../db/objection';
import { ModelClass, UniqueViolationError } from 'objection';
import { AlreadyExists } from '../../exceptions';


export class Model extends Base {
    static modelPaths = [__dirname];
}


export class BaseModel<T> {
    model: ModelClass<Model>

    async create(data: Omit<T, "id">): Promise<void> {
        try {
            await this.model.query().insert(data)
        } catch (e) {
            if (e instanceof UniqueViolationError)
                throw new AlreadyExists();
            throw e;
        }
    }
    async read(data: Partial<T>, join?: string[], exclude?: string[]): Promise<T[]> {
        let query = this.model.query().skipUndefined().where(data)
        if (join) query = query.withGraphFetched(\`[${join.join(', ')}]\`);
        if (exclude) query = query.omit(exclude);
        return query as any;
    }
    async update(id: number, data: Partial<T>): Promise<void> {
        await this.model.query().findById(id).patch(data);
    }
    async delete(id: number): Promise<void> {
        await this.model.query().deleteById(id);
    }
} 

`
}