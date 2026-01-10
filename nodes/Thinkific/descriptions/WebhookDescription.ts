/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Register a new webhook',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete a webhook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all webhooks',
				action: 'Get many webhooks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a webhook',
				action: 'Update a webhook',
			},
		],
		default: 'getAll',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//         webhook:create
	// ----------------------------------
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Chapter Completed',
				value: 'chapter.completed',
			},
			{
				name: 'Course Completed',
				value: 'course.completed',
			},
			{
				name: 'Enrollment Completed',
				value: 'enrollment.completed',
			},
			{
				name: 'Enrollment Created',
				value: 'enrollment.created',
			},
			{
				name: 'Lesson Completed',
				value: 'lesson.completed',
			},
			{
				name: 'Order Completed',
				value: 'order.completed',
			},
			{
				name: 'Order Created',
				value: 'order.created',
			},
			{
				name: 'User Created',
				value: 'user.created',
			},
			{
				name: 'User Sign In',
				value: 'user.signin',
			},
			{
				name: 'User Updated',
				value: 'user.updated',
			},
		],
		default: 'user.created',
		description: 'The event topic to subscribe to',
	},
	{
		displayName: 'Target URL',
		name: 'targetUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'https://example.com/webhook',
		description: 'The URL to send webhook events to',
	},

	// ----------------------------------
	//         webhook:delete
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the webhook to delete',
	},

	// ----------------------------------
	//         webhook:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['webhook'],
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
				resource: ['webhook'],
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
	//         webhook:update
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the webhook to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Target URL',
				name: 'target_url',
				type: 'string',
				default: '',
				description: 'The URL to send webhook events to',
			},
			{
				displayName: 'Topic',
				name: 'topic',
				type: 'options',
				options: [
					{
						name: 'Chapter Completed',
						value: 'chapter.completed',
					},
					{
						name: 'Course Completed',
						value: 'course.completed',
					},
					{
						name: 'Enrollment Completed',
						value: 'enrollment.completed',
					},
					{
						name: 'Enrollment Created',
						value: 'enrollment.created',
					},
					{
						name: 'Lesson Completed',
						value: 'lesson.completed',
					},
					{
						name: 'Order Completed',
						value: 'order.completed',
					},
					{
						name: 'Order Created',
						value: 'order.created',
					},
					{
						name: 'User Created',
						value: 'user.created',
					},
					{
						name: 'User Sign In',
						value: 'user.signin',
					},
					{
						name: 'User Updated',
						value: 'user.updated',
					},
				],
				default: 'user.created',
				description: 'The event topic to subscribe to',
			},
		],
	},
];
