import { ISchemaClassOptions, ISchemaOptions, Schema } from './interfaces'
import 'reflect-metadata'
import * as _ from 'lodash'
const propMetadataKey = Symbol('prop')

export function prop (config: ISchemaOptions): any {
  return  <T extends Schema>(target: T, key: keyof T, descriptor: PropertyDescriptor): any => {
    if (!target.schema) {
      target._schema = {}
    }
    const meta = Reflect.getMetadata('design:type', target, key as string)
    console.log(meta.name)
    addProperty(target, key, config, meta)
    // tslint:disable-next-line: only-arrow-functions
    if (config.required) {
      addRequired(target.schema, key)
    }
  }
}

export const schemaOptions = (config: ISchemaClassOptions) => {
  return <T extends new (...args: any[]) => {}>(
    constructor: T
  ) => {
    return class extends constructor {
      get id () {
        return config.id
      }
      get additionalProperties () {
        return config.additionalProperties !== false
      }
    }
  }
}

const addRequired = (schema: any, key: any) => {
  if (!schema.required) {
    schema.required = []
  }
  schema.required.push(key)
}

const addRef = (target: Schema, meta: any, data: any) => {
  data.$ref = meta.prototype.id
  if (!target.additionalSchemas) {
    target._additionalSchemas = []
  }
  if (_.findIndex(target.additionalSchemas, (val => {
    return val.id === data.$ref
  })) === -1) {
    target.additionalSchemas.push(meta.prototype)
  }
}

const addProperty = (target: Schema, key: any, options: ISchemaOptions, meta: any) => {
  if (!target.schema.properties) {
    target.schema.properties = {}
  }
  const data: any = {}
  if (meta.name === 'String' || meta.name === 'Number') {
    data.type = meta.name.toLowerCase()
  }
  if (options.enum) {
    data.enum = Object.values(options.enum)
  } else if (meta.prototype.id) {
    addRef(target, meta, data)
  }
  target.schema.properties[key] = data
}
//