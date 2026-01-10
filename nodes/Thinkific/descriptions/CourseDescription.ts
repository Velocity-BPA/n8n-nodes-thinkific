/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const courseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['course'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a course by ID',
				action: 'Get a course',
			},
			{
				name: 'Get Chapters',
				value: 'getChapters',
				description: 'Get all chapters in a course',
				action: 'Get course chapters',
			},
			{
				name: 'Get Contents',
				value: 'getContents',
				description: 'Get all content in a course',
				action: 'Get course contents',
			},
			{
				name: 'Get Lessons',
				value: 'getLessons',
				description: 'Get all lessons in a chapter',
				action: 'Get chapter lessons',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many courses',
				action: 'Get many courses',
			},
		],
		default: 'getAll',
	},
];

export const courseFields: INodeProperties[] = [
	// ----------------------------------
	//         course:get
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the course to retrieve',
	},

	// ----------------------------------
	//         course:getChapters
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getChapters'],
			},
		},
		default: '',
		description: 'The ID of the course to get chapters for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getChapters'],
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
				resource: ['course'],
				operation: ['getChapters'],
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
	//         course:getContents
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getContents'],
			},
		},
		default: '',
		description: 'The ID of the course to get contents for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getContents'],
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
				resource: ['course'],
				operation: ['getContents'],
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
	//         course:getLessons
	// ----------------------------------
	{
		displayName: 'Chapter ID',
		name: 'chapterId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getLessons'],
			},
		},
		default: '',
		description: 'The ID of the chapter to get lessons for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getLessons'],
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
				resource: ['course'],
				operation: ['getLessons'],
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
	//         course:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['course'],
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
				resource: ['course'],
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
				resource: ['course'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Instructor ID',
				name: 'instructor_id',
				type: 'string',
				default: '',
				description: 'Filter courses by instructor ID',
			},
		],
	},
];
