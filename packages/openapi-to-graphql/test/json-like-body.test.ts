// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: openapi-to-graphql
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

import { printSchema } from 'graphql'

import { afterAll, beforeAll, expect, test } from '@jest/globals'

import * as openAPIToGraphQL from '../lib/index'

/**
 * Set up the schema first
 */
const oas = require('./fixtures/json-like-body.json')

test('JSON like bodies should treat */* as application/json', () => {
  openAPIToGraphQL.createGraphQLSchema(oas).then(({ schema, report }) => {
    expect(printSchema(schema)).toMatchSnapshot('*/* snapshot')
  })
})
