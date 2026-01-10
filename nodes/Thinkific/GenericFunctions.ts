/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

const BASE_URL = 'https://api.thinkific.com/api/public/v1';

/**
 * Make an authenticated request to the Thinkific API
 */
export async function thinkificApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('thinkificApi');

	const options: IRequestOptions = {
		method,
		uri: `${BASE_URL}${endpoint}`,
		headers: {
			'X-Auth-API-Key': credentials.apiKey as string,
			'X-Auth-Subdomain': credentials.subdomain as string,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	if (Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: getErrorMessage(error),
		});
	}
}

/**
 * Make an authenticated request to the Thinkific API and return all items with pagination
 */
export async function thinkificApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	query: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let page = 1;
	const limit = 100;

	let response: IDataObject;
	do {
		response = await thinkificApiRequest.call(this, method, endpoint, {}, {
			...query,
			page,
			limit,
		}) as IDataObject;

		const items = response.items as IDataObject[];
		if (items) {
			returnData.push(...items);
		}
		page++;
	} while (
		response.items &&
		(response.items as IDataObject[]).length === limit
	);

	return returnData;
}

/**
 * Extract error message from Thinkific API error response
 */
function getErrorMessage(error: unknown): string {
	const err = error as { response?: { body?: IDataObject }; message?: string };
	if (err.response?.body) {
		const body = err.response.body;
		if (body.error) {
			if (body.errors && Array.isArray(body.errors)) {
				return `${body.error}: ${(body.errors as string[]).join(', ')}`;
			}
			return body.error as string;
		}
	}
	if (err.message) {
		return err.message;
	}
	return 'An unknown error occurred';
}

/**
 * Convert boolean strings from API to actual booleans
 */
export function convertBooleanStrings(obj: IDataObject): IDataObject {
	const result: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value === 'true') {
			result[key] = true;
		} else if (value === 'false') {
			result[key] = false;
		} else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			result[key] = convertBooleanStrings(value as IDataObject);
		} else {
			result[key] = value;
		}
	}
	return result;
}

/**
 * Build query string from additional fields
 */
export function buildQueryFromFields(additionalFields: IDataObject): IDataObject {
	const query: IDataObject = {};

	if (additionalFields.page) {
		query.page = additionalFields.page;
	}
	if (additionalFields.limit) {
		query.limit = additionalFields.limit;
	}
	if (additionalFields.query) {
		query.query = additionalFields.query;
	}

	return query;
}

/**
 * Simplify API response for cleaner output
 */
export function simplifyResponse(response: IDataObject): IDataObject {
	// If response has items array, return just the items
	if (response.items && Array.isArray(response.items)) {
		return response;
	}
	return response;
}
