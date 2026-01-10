/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

import { thinkificApiRequest } from './GenericFunctions';

export class ThinkificTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Thinkific Trigger',
		name: 'thinkificTrigger',
		icon: 'file:thinkific.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when Thinkific events occur',
		defaults: {
			name: 'Thinkific Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'thinkificApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'user.created',
				options: [
					{
						name: 'Chapter Completed',
						value: 'chapter.completed',
						description: 'Triggers when a user completes a chapter',
					},
					{
						name: 'Course Completed',
						value: 'course.completed',
						description: 'Triggers when a user completes a course',
					},
					{
						name: 'Enrollment Completed',
						value: 'enrollment.completed',
						description: 'Triggers when an enrollment is completed',
					},
					{
						name: 'Enrollment Created',
						value: 'enrollment.created',
						description: 'Triggers when a new enrollment is created',
					},
					{
						name: 'Lesson Completed',
						value: 'lesson.completed',
						description: 'Triggers when a user completes a lesson',
					},
					{
						name: 'Order Completed',
						value: 'order.completed',
						description: 'Triggers when an order is completed',
					},
					{
						name: 'Order Created',
						value: 'order.created',
						description: 'Triggers when a new order is created',
					},
					{
						name: 'User Created',
						value: 'user.created',
						description: 'Triggers when a new user is created',
					},
					{
						name: 'User Sign In',
						value: 'user.signin',
						description: 'Triggers when a user signs in',
					},
					{
						name: 'User Updated',
						value: 'user.updated',
						description: 'Triggers when a user is updated',
					},
				],
				description: 'The event that will trigger the workflow',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				const webhooks = await thinkificApiRequest.call(this, 'GET', '/webhooks') as IDataObject;
				const items = webhooks.items as IDataObject[];

				if (!items) {
					return false;
				}

				for (const webhook of items) {
					if (webhook.target_url === webhookUrl && webhook.topic === event) {
						const webhookData = this.getWorkflowStaticData('node');
						webhookData.webhookId = webhook.id;
						return true;
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				const body: IDataObject = {
					topic: event,
					target_url: webhookUrl,
				};

				const webhook = await thinkificApiRequest.call(this, 'POST', '/webhooks', body) as IDataObject;

				if (webhook.id === undefined) {
					return false;
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = webhook.id;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						await thinkificApiRequest.call(this, 'DELETE', `/webhooks/${webhookData.webhookId}`);
					} catch (error) {
						return false;
					}
					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();

		return {
			workflowData: [
				this.helpers.returnJsonArray(bodyData),
			],
		};
	}
}
