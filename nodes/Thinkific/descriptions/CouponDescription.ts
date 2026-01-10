/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const couponOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new coupon',
				action: 'Create a coupon',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a coupon',
				action: 'Delete a coupon',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a coupon by ID',
				action: 'Get a coupon',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many coupons',
				action: 'Get many coupons',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a coupon',
				action: 'Update a coupon',
			},
			{
				name: 'Validate',
				value: 'validate',
				description: 'Check if a coupon code is valid',
				action: 'Validate a coupon',
			},
		],
		default: 'getAll',
	},
];

export const couponFields: INodeProperties[] = [
	// ----------------------------------
	//         coupon:create
	// ----------------------------------
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The coupon code',
	},
	{
		displayName: 'Promotion ID',
		name: 'promotionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the promotion this coupon is associated with',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Duration in Months',
				name: 'duration_in_months',
				type: 'number',
				default: 0,
				description: 'Duration in months for subscription discounts',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Internal note about the coupon',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 0,
				description: 'Number of times the coupon can be used (0 for unlimited)',
			},
		],
	},

	// ----------------------------------
	//         coupon:delete
	// ----------------------------------
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the coupon to delete',
	},

	// ----------------------------------
	//         coupon:get
	// ----------------------------------
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the coupon to retrieve',
	},

	// ----------------------------------
	//         coupon:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['coupon'],
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
				resource: ['coupon'],
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
				resource: ['coupon'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Promotion ID',
				name: 'promotion_id',
				type: 'string',
				default: '',
				description: 'Filter coupons by promotion ID',
			},
		],
	},

	// ----------------------------------
	//         coupon:update
	// ----------------------------------
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the coupon to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'The coupon code',
			},
			{
				displayName: 'Duration in Months',
				name: 'duration_in_months',
				type: 'number',
				default: 0,
				description: 'Duration in months for subscription discounts',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Internal note about the coupon',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 0,
				description: 'Number of times the coupon can be used (0 for unlimited)',
			},
		],
	},

	// ----------------------------------
	//         coupon:validate
	// ----------------------------------
	{
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['validate'],
			},
		},
		default: '',
		description: 'The coupon code to validate',
	},
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['validate'],
			},
		},
		default: '',
		description: 'The product ID to check the coupon against',
	},
];
