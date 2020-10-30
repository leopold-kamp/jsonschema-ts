import { ISchemaClassOptions, ISchemaOptions, Schema } from './interfaces'
import 'reflect-metadata'

const propMetadataKey = Symbol('prop')

export function prop (config: ISchemaOptions): any {
  return  <T extends Schema>(target: T, key: keyof T, descriptor: PropertyDescriptor): any => {
    if (!target.schema) {
      target._schema = {}
    }
    const meta = Reflect.getMetadata('design:type', target, key as string)
    addProperty(target.schema, key, config, meta)
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
    }
  }
}

const addRequired = (schema: any, key: any) => {
  if (!schema.required) {
    schema.required = []
  }
  schema.required.push(key)
}

const addProperty = (schema: any, key: any, options: ISchemaOptions, meta: any) => {
  if (!schema.properties) {
    schema.properties = {}
  }
  const data: any = {}
  if (meta.name === 'String' || meta.name === 'Number') {
    data.type = meta.name.toLowerCase()
  }
  schema.properties['key'] = data
}

//