/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const enrollmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Enroll a user in a course',
				action: 'Create an enrollment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an enrollment',
				action: 'Delete an enrollment',
			},
			{
				name: 'Expire',
				value: 'expire',
				description: 'Set enrollment expiry date',
				action: 'Expire an enrollment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an enrollment by ID',
				action: 'Get an enrollment',
			},
			{
				name: 'Get by Course',
				value: 'getByCourse',
				description: 'Get enrollments for a course',
				action: 'Get enrollments by course',
			},
			{
				name: 'Get by User',
				value: 'getByUser',
				description: 'Get enrollments for a user',
				action: 'Get enrollments by user',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many enrollments',
				action: 'Get many enrollments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an enrollment',
				action: 'Update an enrollment',
			},
		],
		default: 'getAll',
	},
];

export const enrollmentFields: INodeProperties[] = [
	// ----------------------------------
	//         enrollment:create
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the user to enroll',
	},
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the course to enroll the user in',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Activated At',
				name: 'activated_at',
				type: 'dateTime',
				default: '',
				description: 'When the enrollment should be activated (ISO 8601 format)',
			},
			{
				displayName: 'Expiry Date',
				name: 'expiry_date',
				type: 'dateTime',
				default: '',
				description: 'When the enrollment should expire (ISO 8601 format)',
			},
		],
	},

	// ----------------------------------
	//         enrollment:delete
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the enrollment to delete',
	},

	// ----------------------------------
	//         enrollment:expire
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['expire'],
			},
		},
		default: '',
		description: 'The ID of the enrollment to expire',
	},
	{
		displayName: 'Expiry Date',
		name: 'expiryDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['expire'],
			},
		},
		default: '',
		description: 'When the enrollment should expire (ISO 8601 format)',
	},

	// ----------------------------------
	//         enrollment:get
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the enrollment to retrieve',
	},

	// ----------------------------------
	//         enrollment:getByCourse
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['getByCourse'],
			},
		},
		default: '',
		description: 'The ID of the course to get enrollments for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['getByCourse'],
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
				resource: ['enrollment'],
				operation: ['getByCourse'],
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
	//         enrollment:getByUser
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['getByUser'],
			},
		},
		default: '',
		description: 'The ID of the user to get enrollments for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['getByUser'],
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
				resource: ['enrollment'],
				operation: ['getByUser'],
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
	//         enrollment:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['enrollment'],
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
				resource: ['enrollment'],
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
				resource: ['enrollment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Completed',
				name: 'completed',
				type: 'boolean',
				default: false,
				description: 'Whether to filter for completed enrollments only',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query to filter enrollments',
			},
		],
	},

	// ----------------------------------
	//         enrollment:update
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the enrollment to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Activated At',
				name: 'activated_at',
				type: 'dateTime',
				default: '',
				description: 'When the enrollment should be activated (ISO 8601 format)',
			},
			{
				displayName: 'Expiry Date',
				name: 'expiry_date',
				type: 'dateTime',
				default: '',
				description: 'When the enrollment should expire (ISO 8601 format)',
			},
		],
	},
];
