import { prop, schemaOptions } from '../descriptors'
import { Schema } from '../interfaces'

enum ETEST {
  GOOD = 'good',
  BAD = 'bad'
}

@schemaOptions({ id: '/TestSchema2Create', additionalProperties: false })
export class TestSchema2 extends Schema {
  @prop({})
  num!: number
}

@schemaOptions({ id: '/TestSchemaCreate' })
export class TestSchema extends Schema {
  @prop({ required: true, minimum: 1, maximum: 4 })
  testProp!: string

  @prop({ enum: ETEST})
  what!: ETEST

  @prop({})
  other!: TestSchema2

  @prop({ type: Number, maxItems: 3 })
  numberList!: number[]

  @prop({ type: TestSchema2, minItems: 1, uniqueItems: true })
  otherList!: TestSchema2[]

  @prop({ multipleOf: 3 })
  multiple!: number

  @prop({ minLength: 3, maxLength: 5, required: true })
  minLen!: string

  @prop({ pattern: '/abc/' })
  regex!: string

  @prop({ exclusiveMinimum: true, exclusiveMaximum: true })
  exclusive!: number
}
