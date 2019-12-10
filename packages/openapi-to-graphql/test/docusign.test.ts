// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: openapi-to-graphql
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

/* globals test, expect */

import * as openAPIToGraphQL from '../lib/index'
import { Options } from '../lib/types/options'

const oas = require('./fixtures/docusign_oas.json')

test('Generate schema without problems', () => {
  const options: Options = {
    strict: false
  }
  return openAPIToGraphQL
    .createGraphQlSchema(oas, options)
    .then(({ schema }) => {
      expect(schema).toBeTruthy()
    })
})
