export interface ISchemaOptions {
  id?: string
  $schema?: string
  $ref?: string
  title?: string
  description?: string
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: boolean
  minimum?: number
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
  // 'enum'?: any[] => Refer to enum
  type?: string | string[]
  format?: string
  /* allOf?: Schema[]
  anyOf?: Schema[]
  oneOf?: Schema[]
  not?: Schema */
}

export interface ISchemaClassOptions {
  id?: string
}

export abstract class Schema {
  _schema?: any
  private _id?: string
  get id () {
    return this._id
  }
  get schema () {
    return this._schema
  }
}