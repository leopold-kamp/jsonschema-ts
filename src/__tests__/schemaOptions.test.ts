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
  @prop({ required: true })
  testProp!: string

  @prop({ enum: ETEST})
  what!: ETEST

  @prop({})
  other!: TestSchema2

}

describe('Decorator tests', () => {
  test('Test schema', () => {
    const schema = new TestSchema()
    console.log(schema.schema)
    console.log(schema.additionalSchemas)
  })
})