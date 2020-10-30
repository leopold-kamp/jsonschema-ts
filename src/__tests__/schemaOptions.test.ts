import { schemaOptions, prop } from '../descriptors'
import { Schema } from '../interfaces'
@schemaOptions({ id: '/TestSchemaCreate' })
class TestSchema extends Schema {
  @prop({ required: true })
  testProp!: string

}


describe('Decorator tests', () => {
  test('Test schema', () => {
    const schema = new TestSchema()
    console.log(schema.schema)
  })
})