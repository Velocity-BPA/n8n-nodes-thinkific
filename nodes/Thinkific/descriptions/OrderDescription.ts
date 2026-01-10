/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['order'],
			},
		},
		options: [
			{
				name: 'Create External',
				value: 'createExternal',
				description: 'Create an external order (bypasses Thinkific checkout)',
				action: 'Create an external order',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an order by ID',
				action: 'Get an order',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many orders',
				action: 'Get many orders',
			},
			{
				name: 'Refund',
				value: 'refund',
				description: 'Refund an order',
				action: 'Refund an order',
			},
		],
		default: 'getAll',
	},
];

export const orderFields: INodeProperties[] = [
	// ----------------------------------
	//         order:createExternal
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['createExternal'],
			},
		},
		default: '',
		description: 'The ID of the user placing the order',
	},
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['createExternal'],
			},
		},
		default: '',
		description: 'The ID of the product being purchased',
	},
	{
		displayName: 'Payment Provider',
		name: 'paymentProvider',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['createExternal'],
			},
		},
		default: '',
		placeholder: 'stripe',
		description: 'The name of the external payment provider',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['createExternal'],
			},
		},
		options: [
			{
				displayName: 'Amount (Cents)',
				name: 'amount_cents',
				type: 'number',
				default: 0,
				description: 'The order amount in cents',
			},
			{
				displayName: 'Billing Name',
				name: 'billing_name',
				type: 'string',
				default: '',
				description: 'The billing name for the order',
			},
			{
				displayName: 'Coupon Code',
				name: 'coupon_code',
				type: 'string',
				default: '',
				description: 'A coupon code to apply to the order',
			},
		],
	},

	// ----------------------------------
	//         order:get
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the order to retrieve',
	},

	// ----------------------------------
	//         order:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['order'],
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
				resource: ['order'],
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
				resource: ['order'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Product ID',
				name: 'product_id',
				type: 'string',
				default: '',
				description: 'Filter orders by product ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Paid',
						value: 'paid',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Refunded',
						value: 'refunded',
					},
				],
				default: '',
				description: 'Filter orders by status',
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filter orders by user ID',
			},
		],
	},

	// ----------------------------------
	//         order:refund
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['refund'],
			},
		},
		default: '',
		description: 'The ID of the order to refund',
	},
];
