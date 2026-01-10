/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Add Users',
				value: 'addUsers',
				description: 'Add users to a group',
				action: 'Add users to a group',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new group',
				action: 'Create a group',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a group by ID',
				action: 'Get a group',
			},
			{
				name: 'Get Analysts',
				value: 'getAnalysts',
				description: 'Get analysts for a group',
				action: 'Get group analysts',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many groups',
				action: 'Get many groups',
			},
			{
				name: 'Remove User',
				value: 'removeUser',
				description: 'Remove a user from a group',
				action: 'Remove user from group',
			},
		],
		default: 'getAll',
	},
];

export const groupFields: INodeProperties[] = [
	// ----------------------------------
	//         group:addUsers
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addUsers'],
			},
		},
		default: '',
		description: 'The ID of the group to add users to',
	},
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addUsers'],
			},
		},
		default: '',
		description: 'Comma-separated list of user IDs to add to the group',
	},

	// ----------------------------------
	//         group:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the group',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Group Analyst IDs',
				name: 'group_analyst_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of user IDs to assign as group analysts',
			},
			{
				displayName: 'User IDs',
				name: 'user_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of user IDs to add to the group',
			},
		],
	},

	// ----------------------------------
	//         group:get
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the group to retrieve',
	},

	// ----------------------------------
	//         group:getAnalysts
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAnalysts'],
			},
		},
		default: '',
		description: 'The ID of the group to get analysts for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAnalysts'],
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
				resource: ['group'],
				operation: ['getAnalysts'],
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
	//         group:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
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
				resource: ['group'],
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
	//         group:removeUser
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['removeUser'],
			},
		},
		default: '',
		description: 'The ID of the group to remove the user from',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['removeUser'],
			},
		},
		default: '',
		description: 'The ID of the user to remove from the group',
	},
];
