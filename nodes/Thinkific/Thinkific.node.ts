/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	thinkificApiRequest,
	thinkificApiRequestAllItems,
} from './GenericFunctions';

import {
	userOperations,
	userFields,
} from './descriptions/UserDescription';

import {
	courseOperations,
	courseFields,
} from './descriptions/CourseDescription';

import {
	enrollmentOperations,
	enrollmentFields,
} from './descriptions/EnrollmentDescription';

import {
	productOperations,
	productFields,
} from './descriptions/ProductDescription';

import {
	orderOperations,
	orderFields,
} from './descriptions/OrderDescription';

import {
	promotionOperations,
	promotionFields,
} from './descriptions/PromotionDescription';

import {
	couponOperations,
	couponFields,
} from './descriptions/CouponDescription';

import {
	groupOperations,
	groupFields,
} from './descriptions/GroupDescription';

import {
	webhookOperations,
	webhookFields,
} from './descriptions/WebhookDescription';

// Log licensing notice once per node load
const LICENSING_LOGGED = Symbol.for('thinkific.licensing.logged');
if (!(globalThis as Record<symbol, boolean>)[LICENSING_LOGGED]) {
	console.warn(`
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);
	(globalThis as Record<symbol, boolean>)[LICENSING_LOGGED] = true;
}

export class Thinkific implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Thinkific',
		name: 'thinkific',
		icon: 'file:thinkific.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Thinkific API for course management and e-commerce automation',
		defaults: {
			name: 'Thinkific',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'thinkificApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Coupon',
						value: 'coupon',
					},
					{
						name: 'Course',
						value: 'course',
					},
					{
						name: 'Enrollment',
						value: 'enrollment',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Promotion',
						value: 'promotion',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'user',
			},
			// User
			...userOperations,
			...userFields,
			// Course
			...courseOperations,
			...courseFields,
			// Enrollment
			...enrollmentOperations,
			...enrollmentFields,
			// Product
			...productOperations,
			...productFields,
			// Order
			...orderOperations,
			...orderFields,
			// Promotion
			...promotionOperations,
			...promotionFields,
			// Coupon
			...couponOperations,
			...couponFields,
			// Group
			...groupOperations,
			...groupFields,
			// Webhook
			...webhookOperations,
			...webhookFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// User Operations
				if (resource === 'user') {
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							email,
							...additionalFields,
						};

						responseData = await thinkificApiRequest.call(this, 'POST', '/users', body) as IDataObject;
					}

					if (operation === 'delete') {
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'DELETE', `/users/${userId}`) as IDataObject;
					}

					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/users/${userId}`) as IDataObject;
					}

					if (operation === 'getByEmail') {
						const email = this.getNodeParameter('email', i) as string;
						const response = await thinkificApiRequest.call(this, 'GET', '/users', {}, { query: { email } }) as IDataObject;
						const items = response.items as IDataObject[];
						responseData = items && items.length > 0 ? items[0] : {};
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/users', filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/users', {}, {
								...filters,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const userId = this.getNodeParameter('userId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						responseData = await thinkificApiRequest.call(this, 'PUT', `/users/${userId}`, updateFields) as IDataObject;
					}
				}

				// Course Operations
				if (resource === 'course') {
					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/courses/${courseId}`) as IDataObject;
					}

					if (operation === 'getChapters') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/chapters`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', `/courses/${courseId}/chapters`, {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getContents') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/contents`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', `/courses/${courseId}/contents`, {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getLessons') {
						const chapterId = this.getNodeParameter('chapterId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', `/chapters/${chapterId}/contents`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', `/chapters/${chapterId}/contents`, {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/courses', filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/courses', {}, {
								...filters,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}
				}

				// Enrollment Operations
				if (resource === 'enrollment') {
					if (operation === 'create') {
						const userId = this.getNodeParameter('userId', i) as string;
						const courseId = this.getNodeParameter('courseId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							user_id: parseInt(userId, 10),
							course_id: parseInt(courseId, 10),
							...additionalFields,
						};

						responseData = await thinkificApiRequest.call(this, 'POST', '/enrollments', body) as IDataObject;
					}

					if (operation === 'delete') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'DELETE', `/enrollments/${enrollmentId}`) as IDataObject;
					}

					if (operation === 'expire') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						const expiryDate = this.getNodeParameter('expiryDate', i) as string;

						responseData = await thinkificApiRequest.call(this, 'PUT', `/enrollments/${enrollmentId}`, {
							expiry_date: expiryDate,
						}) as IDataObject;
					}

					if (operation === 'get') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/enrollments/${enrollmentId}`) as IDataObject;
					}

					if (operation === 'getByCourse') {
						const courseId = this.getNodeParameter('courseId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/enrollments', {
								course_id: courseId,
							});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/enrollments', {}, {
								course_id: courseId,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getByUser') {
						const userId = this.getNodeParameter('userId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/enrollments', {
								user_id: userId,
							});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/enrollments', {}, {
								user_id: userId,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/enrollments', filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/enrollments', {}, {
								...filters,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						responseData = await thinkificApiRequest.call(this, 'PUT', `/enrollments/${enrollmentId}`, updateFields) as IDataObject;
					}
				}

				// Product Operations
				if (resource === 'product') {
					if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/products/${productId}`) as IDataObject;
					}

					if (operation === 'getCourses') {
						const productId = this.getNodeParameter('productId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', `/products/${productId}/courses`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', `/products/${productId}/courses`, {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/products', filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/products', {}, {
								...filters,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getPrices') {
						const productId = this.getNodeParameter('productId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/products/${productId}/prices`) as IDataObject;
					}
				}

				// Order Operations
				if (resource === 'order') {
					if (operation === 'createExternal') {
						const userId = this.getNodeParameter('userId', i) as string;
						const productId = this.getNodeParameter('productId', i) as string;
						const paymentProvider = this.getNodeParameter('paymentProvider', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							user_id: parseInt(userId, 10),
							product_id: parseInt(productId, 10),
							payment_provider: paymentProvider,
							...additionalFields,
						};

						responseData = await thinkificApiRequest.call(this, 'POST', '/orders', body) as IDataObject;
					}

					if (operation === 'get') {
						const orderId = this.getNodeParameter('orderId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/orders/${orderId}`) as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/orders', filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/orders', {}, {
								...filters,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'refund') {
						const orderId = this.getNodeParameter('orderId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'POST', `/orders/${orderId}/refund`) as IDataObject;
					}
				}

				// Promotion Operations
				if (resource === 'promotion') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const discountType = this.getNodeParameter('discountType', i) as string;
						const discountAmount = this.getNodeParameter('discountAmount', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							discount_type: discountType,
							discount_amount: discountAmount,
						};

						if (additionalFields.product_ids) {
							body.product_ids = (additionalFields.product_ids as string).split(',').map(id => parseInt(id.trim(), 10));
							delete additionalFields.product_ids;
						}

						Object.assign(body, additionalFields);

						responseData = await thinkificApiRequest.call(this, 'POST', '/promotions', body) as IDataObject;
					}

					if (operation === 'delete') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'DELETE', `/promotions/${promotionId}`) as IDataObject;
					}

					if (operation === 'get') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/promotions/${promotionId}`) as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/promotions');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/promotions', {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						if (updateFields.product_ids) {
							updateFields.product_ids = (updateFields.product_ids as string).split(',').map(id => parseInt(id.trim(), 10));
						}

						responseData = await thinkificApiRequest.call(this, 'PUT', `/promotions/${promotionId}`, updateFields) as IDataObject;
					}
				}

				// Coupon Operations
				if (resource === 'coupon') {
					if (operation === 'create') {
						const code = this.getNodeParameter('code', i) as string;
						const promotionId = this.getNodeParameter('promotionId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							code,
							promotion_id: parseInt(promotionId, 10),
							...additionalFields,
						};

						responseData = await thinkificApiRequest.call(this, 'POST', '/coupons', body) as IDataObject;
					}

					if (operation === 'delete') {
						const couponId = this.getNodeParameter('couponId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'DELETE', `/coupons/${couponId}`) as IDataObject;
					}

					if (operation === 'get') {
						const couponId = this.getNodeParameter('couponId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/coupons/${couponId}`) as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/coupons', filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/coupons', {}, {
								...filters,
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const couponId = this.getNodeParameter('couponId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						responseData = await thinkificApiRequest.call(this, 'PUT', `/coupons/${couponId}`, updateFields) as IDataObject;
					}

					if (operation === 'validate') {
						const couponCode = this.getNodeParameter('couponCode', i) as string;
						const productId = this.getNodeParameter('productId', i) as string;

						responseData = await thinkificApiRequest.call(this, 'GET', '/coupons/validate', {}, {
							code: couponCode,
							product_id: productId,
						}) as IDataObject;
					}
				}

				// Group Operations
				if (resource === 'group') {
					if (operation === 'addUsers') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const userIds = this.getNodeParameter('userIds', i) as string;

						const body: IDataObject = {
							user_ids: userIds.split(',').map(id => parseInt(id.trim(), 10)),
						};

						responseData = await thinkificApiRequest.call(this, 'POST', `/groups/${groupId}/users`, body) as IDataObject;
					}

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
						};

						if (additionalFields.user_ids) {
							body.user_ids = (additionalFields.user_ids as string).split(',').map(id => parseInt(id.trim(), 10));
							delete additionalFields.user_ids;
						}

						if (additionalFields.group_analyst_ids) {
							body.group_analyst_ids = (additionalFields.group_analyst_ids as string).split(',').map(id => parseInt(id.trim(), 10));
							delete additionalFields.group_analyst_ids;
						}

						Object.assign(body, additionalFields);

						responseData = await thinkificApiRequest.call(this, 'POST', '/groups', body) as IDataObject;
					}

					if (operation === 'get') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'GET', `/groups/${groupId}`) as IDataObject;
					}

					if (operation === 'getAnalysts') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', `/groups/${groupId}/analysts`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', `/groups/${groupId}/analysts`, {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/groups');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/groups', {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'removeUser') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;

						responseData = await thinkificApiRequest.call(this, 'DELETE', `/groups/${groupId}/users/${userId}`) as IDataObject;
					}
				}

				// Webhook Operations
				if (resource === 'webhook') {
					if (operation === 'create') {
						const topic = this.getNodeParameter('topic', i) as string;
						const targetUrl = this.getNodeParameter('targetUrl', i) as string;

						const body: IDataObject = {
							topic,
							target_url: targetUrl,
						};

						responseData = await thinkificApiRequest.call(this, 'POST', '/webhooks', body) as IDataObject;
					}

					if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;
						responseData = await thinkificApiRequest.call(this, 'DELETE', `/webhooks/${webhookId}`) as IDataObject;
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await thinkificApiRequestAllItems.call(this, 'GET', '/webhooks');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await thinkificApiRequest.call(this, 'GET', '/webhooks', {}, {
								limit,
								page: 1,
							}) as IDataObject;
							responseData = (response.items as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						responseData = await thinkificApiRequest.call(this, 'PUT', `/webhooks/${webhookId}`, updateFields) as IDataObject;
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
