import { schemaOptions, prop } from '../descriptors'
import { Schema } from '../interfaces'

enum ETEST {
  GOOD = 'good',
  BAD = 'bad'
}

@schemaOptions({ id: '/TestSchema2Create', additionalProperties: false })
class TestSchema2 extends Schema {
  @prop({})
  num!: number
}

@schemaOptions({ id: '/TestSchemaCreate' })
class TestSchema extends Schema {
  @prop({ required: true, minimum: 1, maximum: 4 })
  testProp!: string

  @prop({ enum: ETEST})
  what!: ETEST

  @prop({})
  other!: TestSchema2

  @prop({ type: Number })
  numberList!: number[]

  @prop({ type: TestSchema2 })
  otherList!: TestSchema2[]

}

describe('Decorator tests', () => {
  test('Test schema', () => {
    const schema = new TestSchema()
    expect(schema.schema).toMatchObject({
      properties: {
           testProp: {
                type: 'string',
                minimum: 1,
                maximum: 4
           },
           what: {
                type: 'string',
                enum: [
                     'good',
                     'bad'
                ]
           },
           other: {
                $ref: '/TestSchema2Create'
           },
           numberList: {
                item: {
                     type: 'number'
                }
           },
           otherList: {
                item: {
                     $ref: '/TestSchema2Create'
                }
           }
      },
      required: [
           'testProp'
      ]
 })
  })
})