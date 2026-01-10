/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ThinkificApi implements ICredentialType {
	name = 'thinkificApi';
	displayName = 'Thinkific API';
	documentationUrl = 'https://developers.thinkific.com/api/api-documentation/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Thinkific API key. Find it in Settings → Code & analytics → API.',
		},
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'myschool',
			description: 'Your Thinkific subdomain (e.g., "myschool" from myschool.thinkific.com). This is case-sensitive.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Auth-API-Key': '={{$credentials.apiKey}}',
				'X-Auth-Subdomain': '={{$credentials.subdomain}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.thinkific.com/api/public/v1',
			url: '/users',
			method: 'GET',
			qs: {
				page: 1,
				limit: 1,
			},
		},
	};
}
