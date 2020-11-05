import { TestSchema } from '../__mocks__/Test'

describe('Decorator tests', () => {
	test('Test schema', () => {
		const schema = new TestSchema()
		expect(schema.jsonschema).toEqual({
			id: '/TestSchemaCreate',
			additionalProperties: true,
			properties: {
				exclusive: {
					exclusiveMaximum: true,
					exclusiveMinimum: true,
					type: 'number'
				},
				minLen: {
					maxLength: 5,
					minLength: 3,
					type: 'string'
				},
				multiple: {
					multipleOf: 3,
					type: 'number'
				},
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
						type: 'number',
						maxItems: 3
					}
				},
				otherList: {
					item: {
						$ref: '/TestSchema2Create',
						minItems: 1,
						uniqueItems: true
					}
				},
				regex: {
					type: 'string',
					pattern: '/abc/'
				},
				someDate: {
					type: 'date-time'
				}
			},
			required: [
				'testProp',
				'minLen'
			]
		})
	})
	test('Test validate', () => {
		const schema = new TestSchema()
		const result = schema.validate({
			testProp: 'test',
			minLen: 'fit',
			other: {
				num: 3
			}
		})
		expect(result.valid).toBeTruthy()
	})
})