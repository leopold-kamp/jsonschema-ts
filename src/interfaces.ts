import { Options, SchemaContext, Validator } from "jsonschema"

export interface ISchemaOptions {
  id?: string
  $schema?: string
  title?: string
  description?: string
  multipleOf?: number // done
  maximum?: number // done
  exclusiveMaximum?: boolean
  minimum?: number // done
  exclusiveMinimum?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  // additionalItems?: boolean | Schema
  // items?: Schema | Schema[] => will be get from prop
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: boolean
  // additionalProperties?: boolean | Schema
  // definitions?: { [name: string]: Schema }
  // properties?: { [name: string]: Schema } => Will be class props
  /*patternProperties?: {
      [name: string]: Schema
  }
  dependencies?: {
      [name: string]: Schema | string[]
  }*/
  enum?: any // => Refer to enum
  type?: any
  format?: string
  /* allOf?: Schema[]
  anyOf?: Schema[]
  oneOf?: Schema[]
  not?: Schema */
}

export interface ISchemaClassOptions {
  id?: string,
  additionalProperties?: boolean
}

export abstract class Schema {
  _schema?: any
  private _id?: string
  private _additionalProperties?: boolean
  validator: Validator

  _additionalSchemas?: Schema[]
  get id () {
    return this._id
  }
  get schema () {
    return this._schema
  }
  get additionalSchemas () {
    return this._additionalSchemas
  }
  get additionalProperties () {
    return this._additionalProperties
  }

  validate (toValidate: any, options?: Options, ctx?: SchemaContext) {
    return this.validator.validate(toValidate, this.jsonschema, options, ctx)
  }

  get jsonschema () {
    return {
      id: this.id,
      additionalProperties: this.additionalProperties,
      ...this.schema
    }
  }
}
