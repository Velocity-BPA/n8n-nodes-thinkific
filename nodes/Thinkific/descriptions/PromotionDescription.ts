/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const promotionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new promotion',
				action: 'Create a promotion',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a promotion',
				action: 'Delete a promotion',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a promotion by ID',
				action: 'Get a promotion',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many promotions',
				action: 'Get many promotions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a promotion',
				action: 'Update a promotion',
			},
		],
		default: 'getAll',
	},
];

export const promotionFields: INodeProperties[] = [
	// ----------------------------------
	//         promotion:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the promotion',
	},
	{
		displayName: 'Discount Type',
		name: 'discountType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Fixed',
				value: 'fixed',
			},
			{
				name: 'Percentage',
				value: 'percentage',
			},
		],
		default: 'percentage',
		description: 'The type of discount',
	},
	{
		displayName: 'Discount Amount',
		name: 'discountAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The discount value (percentage or fixed amount in cents)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the promotion',
			},
			{
				displayName: 'Expires At',
				name: 'expires_at',
				type: 'dateTime',
				default: '',
				description: 'When the promotion expires (ISO 8601 format)',
			},
			{
				displayName: 'Product IDs',
				name: 'product_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of product IDs the promotion applies to',
			},
			{
				displayName: 'Starts At',
				name: 'starts_at',
				type: 'dateTime',
				default: '',
				description: 'When the promotion starts (ISO 8601 format)',
			},
		],
	},

	// ----------------------------------
	//         promotion:delete
	// ----------------------------------
	{
		displayName: 'Promotion ID',
		name: 'promotionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the promotion to delete',
	},

	// ----------------------------------
	//         promotion:get
	// ----------------------------------
	{
		displayName: 'Promotion ID',
		name: 'promotionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the promotion to retrieve',
	},

	// ----------------------------------
	//         promotion:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['promotion'],
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
				resource: ['promotion'],
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

	// ----------------------------------
	//         promotion:update
	// ----------------------------------
	{
		displayName: 'Promotion ID',
		name: 'promotionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the promotion to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['promotion'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the promotion',
			},
			{
				displayName: 'Discount Amount',
				name: 'discount_amount',
				type: 'number',
				default: 0,
				description: 'The discount value (percentage or fixed amount in cents)',
			},
			{
				displayName: 'Discount Type',
				name: 'discount_type',
				type: 'options',
				options: [
					{
						name: 'Fixed',
						value: 'fixed',
					},
					{
						name: 'Percentage',
						value: 'percentage',
					},
				],
				default: 'percentage',
				description: 'The type of discount',
			},
			{
				displayName: 'Expires At',
				name: 'expires_at',
				type: 'dateTime',
				default: '',
				description: 'When the promotion expires (ISO 8601 format)',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the promotion',
			},
			{
				displayName: 'Product IDs',
				name: 'product_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of product IDs the promotion applies to',
			},
			{
				displayName: 'Starts At',
				name: 'starts_at',
				type: 'dateTime',
				default: '',
				description: 'When the promotion starts (ISO 8601 format)',
			},
		],
	},
];
