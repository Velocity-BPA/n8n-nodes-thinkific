/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a product by ID',
				action: 'Get a product',
			},
			{
				name: 'Get Courses',
				value: 'getCourses',
				description: 'Get courses in a product',
				action: 'Get product courses',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many products',
				action: 'Get many products',
			},
			{
				name: 'Get Prices',
				value: 'getPrices',
				description: 'Get pricing for a product',
				action: 'Get product prices',
			},
		],
		default: 'getAll',
	},
];

export const productFields: INodeProperties[] = [
	// ----------------------------------
	//         product:get
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the product to retrieve',
	},

	// ----------------------------------
	//         product:getCourses
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getCourses'],
			},
		},
		default: '',
		description: 'The ID of the product to get courses for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getCourses'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getCourses'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         product:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Hidden',
						value: 'hidden',
					},
					{
						name: 'Published',
						value: 'published',
					},
				],
				default: '',
				description: 'Filter products by status',
			},
		],
	},

	// ----------------------------------
	//         product:getPrices
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getPrices'],
			},
		},
		default: '',
		description: 'The ID of the product to get prices for',
	},
];
