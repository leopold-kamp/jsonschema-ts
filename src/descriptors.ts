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
    if (!target.schema.properties) {
      target.schema.properties = {}
    }
    let data: any = {}
    if (meta.name === 'Array') {
      if (config.type) {
        data.item = addProperty(config, config.type, target)
      }
    } else {
      data = addProperty(config, meta, target)
    }
    target.schema.properties[key] = data
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

const addProperty = (options: ISchemaOptions, meta: any, target: Schema, data: any = {}) => {
  if (meta.name === 'String' || meta.name === 'Number') {
    data.type = meta.name.toLowerCase()
  }
  applyOptions(data, options)
  if (options.enum) {
    data.enum = Object.values(options.enum)
  } else if (meta.prototype.id) {
    addRef(target, meta, data)
  } else if (meta.name === 'Array') {
    if (meta.type) {
      data.item = {}
      addRef(target, meta, data.item)
    }
  }
  return data
}

const applyOptions = (data: any, options: ISchemaOptions) => {
  if (_.isNumber(options.minimum)) {
    data.minimum = options.minimum
  }
  if (_.isNumber(options.maximum)) {
    data.maximum = options.maximum
  }
  if (_.isNumber(options.multipleOf)) {
    data.multipleOf = options.multipleOf
  }
  if (_.isNumber(options.minLength)) {
    data.minLength = options.minLength
  }
  if (_.isNumber(options.maxLength)) {
    data.maxLength = options.maxLength
  }
  if (_.isNumber(options.minItems)) {
    data.minItems = options.minItems
  }
  if (_.isNumber(options.maxItems)) {
    data.maxItems = options.maxItems
  }
  if (options.pattern) {
    data.pattern = options.pattern
  }
  if (_.isBoolean(options.uniqueItems)) {
    data.uniqueItems = options.uniqueItems
  }
  if (_.isBoolean(options.exclusiveMaximum)) {
    data.exclusiveMaximum = options.exclusiveMaximum
  }
  if (_.isBoolean(options.exclusiveMaximum)) {
    data.exclusiveMinimum = options.exclusiveMinimum
  }
}

//