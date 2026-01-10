/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Thinkific } from '../../nodes/Thinkific/Thinkific.node';
import { ThinkificTrigger } from '../../nodes/Thinkific/ThinkificTrigger.node';

describe('Thinkific Node', () => {
	let thinkificNode: Thinkific;

	beforeEach(() => {
		thinkificNode = new Thinkific();
	});

	describe('Node Configuration', () => {
		it('should have correct node name', () => {
			expect(thinkificNode.description.name).toBe('thinkific');
		});

		it('should have correct display name', () => {
			expect(thinkificNode.description.displayName).toBe('Thinkific');
		});

		it('should have correct group', () => {
			expect(thinkificNode.description.group).toContain('transform');
		});

		it('should have version 1', () => {
			expect(thinkificNode.description.version).toBe(1);
		});

		it('should have correct subtitle', () => {
			expect(thinkificNode.description.subtitle).toBe('={{$parameter["operation"] + ": " + $parameter["resource"]}}');
		});

		it('should require thinkificApi credentials', () => {
			const credentials = thinkificNode.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials?.some(c => c.name === 'thinkificApi')).toBe(true);
		});
	});

	describe('Resources', () => {
		it('should have all 9 required resources', () => {
			const resourceProperty = thinkificNode.description.properties.find(
				p => p.name === 'resource'
			);
			expect(resourceProperty).toBeDefined();
			
			const resourceOptions = resourceProperty?.options as Array<{ value: string }>;
			expect(resourceOptions).toBeDefined();
			
			const resourceValues = resourceOptions?.map(o => o.value) || [];
			expect(resourceValues).toContain('user');
			expect(resourceValues).toContain('course');
			expect(resourceValues).toContain('enrollment');
			expect(resourceValues).toContain('product');
			expect(resourceValues).toContain('order');
			expect(resourceValues).toContain('promotion');
			expect(resourceValues).toContain('coupon');
			expect(resourceValues).toContain('group');
			expect(resourceValues).toContain('webhook');
		});
	});

	describe('User Resource Operations', () => {
		it('should have user operations', () => {
			const operationProperty = thinkificNode.description.properties.find(
				p => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('user')
			);
			expect(operationProperty).toBeDefined();
		});
	});

	describe('Course Resource Operations', () => {
		it('should have course operations', () => {
			const operationProperty = thinkificNode.description.properties.find(
				p => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('course')
			);
			expect(operationProperty).toBeDefined();
		});
	});

	describe('Enrollment Resource Operations', () => {
		it('should have enrollment operations', () => {
			const operationProperty = thinkificNode.description.properties.find(
				p => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('enrollment')
			);
			expect(operationProperty).toBeDefined();
		});
	});
});

describe('Thinkific Trigger Node', () => {
	let triggerNode: ThinkificTrigger;

	beforeEach(() => {
		triggerNode = new ThinkificTrigger();
	});

	describe('Node Configuration', () => {
		it('should have correct node name', () => {
			expect(triggerNode.description.name).toBe('thinkificTrigger');
		});

		it('should have correct display name', () => {
			expect(triggerNode.description.displayName).toBe('Thinkific Trigger');
		});

		it('should have correct group', () => {
			expect(triggerNode.description.group).toContain('trigger');
		});

		it('should have version 1', () => {
			expect(triggerNode.description.version).toBe(1);
		});

		it('should require thinkificApi credentials', () => {
			const credentials = triggerNode.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials?.some(c => c.name === 'thinkificApi')).toBe(true);
		});
	});

	describe('Webhook Events', () => {
		it('should have event property', () => {
			const eventProperty = triggerNode.description.properties.find(
				p => p.name === 'event'
			);
			expect(eventProperty).toBeDefined();
		});

		it('should support all webhook event types', () => {
			const eventProperty = triggerNode.description.properties.find(
				p => p.name === 'event'
			);
			const eventOptions = eventProperty?.options as Array<{ value: string }>;
			const eventValues = eventOptions?.map(o => o.value) || [];

			// Check for required webhook events
			expect(eventValues).toContain('user.created');
			expect(eventValues).toContain('user.updated');
			expect(eventValues).toContain('user.signin');
			expect(eventValues).toContain('enrollment.created');
			expect(eventValues).toContain('enrollment.completed');
			expect(eventValues).toContain('order.created');
			expect(eventValues).toContain('order.completed');
			expect(eventValues).toContain('course.completed');
			expect(eventValues).toContain('lesson.completed');
			expect(eventValues).toContain('chapter.completed');
		});
	});

	describe('Webhook Methods', () => {
		it('should define webhook methods', () => {
			expect(triggerNode.webhookMethods).toBeDefined();
			expect(triggerNode.webhookMethods?.default).toBeDefined();
		});

		it('should have checkExists method', () => {
			expect(triggerNode.webhookMethods?.default?.checkExists).toBeDefined();
		});

		it('should have create method', () => {
			expect(triggerNode.webhookMethods?.default?.create).toBeDefined();
		});

		it('should have delete method', () => {
			expect(triggerNode.webhookMethods?.default?.delete).toBeDefined();
		});
	});
});

describe('Node Exports', () => {
	it('should export Thinkific node class', () => {
		expect(Thinkific).toBeDefined();
		expect(typeof Thinkific).toBe('function');
	});

	it('should export ThinkificTrigger node class', () => {
		expect(ThinkificTrigger).toBeDefined();
		expect(typeof ThinkificTrigger).toBe('function');
	});

	it('should create instances correctly', () => {
		const node = new Thinkific();
		const trigger = new ThinkificTrigger();
		expect(node).toBeInstanceOf(Thinkific);
		expect(trigger).toBeInstanceOf(ThinkificTrigger);
	});
});
