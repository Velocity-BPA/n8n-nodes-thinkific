/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a user',
				action: 'Delete a user',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a user by ID',
				action: 'Get a user',
			},
			{
				name: 'Get by Email',
				value: 'getByEmail',
				description: 'Get a user by email address',
				action: 'Get a user by email',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many users',
				action: 'Get many users',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a user',
				action: 'Update a user',
			},
		],
		default: 'getAll',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user:create
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The email address of the user (must be unique)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Bio',
				name: 'bio',
				type: 'string',
				default: '',
				description: 'User biography',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'User company name',
			},
			{
				displayName: 'External Source',
				name: 'external_source',
				type: 'string',
				default: '',
				description: 'External source identifier',
			},
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'User first name',
			},
			{
				displayName: 'Headline',
				name: 'headline',
				type: 'string',
				default: '',
				description: 'User headline or title',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: 'User last name',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Initial password for the user',
			},
			{
				displayName: 'Roles',
				name: 'roles',
				type: 'multiOptions',
				options: [
					{
						name: 'Affiliate',
						value: 'affiliate',
					},
					{
						name: 'Course Admin',
						value: 'course_admin',
					},
					{
						name: 'Group Analyst',
						value: 'group_analyst',
					},
					{
						name: 'Site Admin',
						value: 'site_admin',
					},
				],
				default: [],
				description: 'Roles to assign to the user',
			},
			{
				displayName: 'Send Welcome Email',
				name: 'send_welcome_email',
				type: 'boolean',
				default: true,
				description: 'Whether to send a welcome email to the user',
			},
		],
	},

	// ----------------------------------
	//         user:delete
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the user to delete',
	},

	// ----------------------------------
	//         user:get
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the user to retrieve',
	},

	// ----------------------------------
	//         user:getByEmail
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getByEmail'],
			},
		},
		default: '',
		description: 'The email address of the user to find',
	},

	// ----------------------------------
	//         user:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
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
				resource: ['user'],
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
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query to filter users (searches name and email)',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{
						name: 'Affiliate',
						value: 'affiliate',
					},
					{
						name: 'Course Admin',
						value: 'course_admin',
					},
					{
						name: 'Group Analyst',
						value: 'group_analyst',
					},
					{
						name: 'Site Admin',
						value: 'site_admin',
					},
				],
				default: '',
				description: 'Filter users by role',
			},
		],
	},

	// ----------------------------------
	//         user:update
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the user to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Bio',
				name: 'bio',
				type: 'string',
				default: '',
				description: 'User biography',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'User company name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'New email address for the user',
			},
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'User first name',
			},
			{
				displayName: 'Headline',
				name: 'headline',
				type: 'string',
				default: '',
				description: 'User headline or title',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: 'User last name',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'New password for the user',
			},
			{
				displayName: 'Roles',
				name: 'roles',
				type: 'multiOptions',
				options: [
					{
						name: 'Affiliate',
						value: 'affiliate',
					},
					{
						name: 'Course Admin',
						value: 'course_admin',
					},
					{
						name: 'Group Analyst',
						value: 'group_analyst',
					},
					{
						name: 'Site Admin',
						value: 'site_admin',
					},
				],
				default: [],
				description: 'Roles to assign to the user',
			},
		],
	},
];
