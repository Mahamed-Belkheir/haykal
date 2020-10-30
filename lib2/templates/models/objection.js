const typeMap = {
    "string":       'string',
    "number":       'number',
    "boolean":      'boolean',
    "date":         'Date',
    "increments":   'number'
};

const jsonSchemaMap = {
    "string":       '{ type: "string" },',
    "number":       '{ type: "number" },',
    "boolean":      '{ type: "boolean" },',
    "date":         '{ type: "string", format: "datetime" },',
    "increments":   '{ type: "number" },',
};



const objectionModel = (name, attributes) => (`export class ${name}ObjectionModel extends Model implements ${name} {
    ${Object.entries(attributes).map(([key, value]) => {
        return `${key}:\t\t\t${typeMap[value]}`
    }).join("\n\t")}

    static tableName = "${pluralize(name.toLowerCase())}";
    static jsonSchema = {
        type: "object",
        attributes: {
            ${Object.entries(attributes).map(([key, value]) => {
                return `${key}:\t\t\t${jsonSchemaMap[value]}`
            }).join("\n\t\t\t")}
        }
    }
}

export class ${name}Model extends BaseModel<${name}> implements ${name}ModelInterface {
    model = ${name}ObjectionModel
}
`);

const objectionModelBase = () => (`import Base from '../../db/objection';
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
        if (join) query = query.withGraphFetched(\`[\${join.join(', ')}]\`);
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
`);


module.exports = {
    objectionModel,
    objectionModelBase,
}