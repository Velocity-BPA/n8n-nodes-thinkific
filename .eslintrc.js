/**
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/community',
		'prettier',
	],
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'n8n-nodes-base/node-param-description-missing-final-period': 'off',
		'n8n-nodes-base/node-param-description-wrong-for-dynamic-options': 'off',
		'n8n-nodes-base/node-param-description-excess-final-period': 'off',
		'n8n-nodes-base/node-param-description-unencoded-angle-brackets': 'off',
	},
	ignorePatterns: ['dist/**', 'node_modules/**', '*.js'],
};
