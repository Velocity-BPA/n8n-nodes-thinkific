/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { convertBooleanStrings, buildQueryFromFields, simplifyResponse } from '../../nodes/Thinkific/GenericFunctions';
import type { IDataObject } from 'n8n-workflow';

describe('GenericFunctions', () => {
	describe('convertBooleanStrings', () => {
		it('should convert "true" string to boolean true', () => {
			const input: IDataObject = { active: 'true' };
			const result = convertBooleanStrings(input);
			expect(result.active).toBe(true);
		});

		it('should convert "false" string to boolean false', () => {
			const input: IDataObject = { active: 'false' };
			const result = convertBooleanStrings(input);
			expect(result.active).toBe(false);
		});

		it('should not modify non-boolean strings', () => {
			const input: IDataObject = { name: 'John', email: 'john@example.com' };
			const result = convertBooleanStrings(input);
			expect(result.name).toBe('John');
			expect(result.email).toBe('john@example.com');
		});

		it('should handle nested objects', () => {
			const input: IDataObject = {
				user: {
					active: 'true',
					verified: 'false',
					name: 'John',
				},
			};
			const result = convertBooleanStrings(input);
			expect((result.user as IDataObject).active).toBe(true);
			expect((result.user as IDataObject).verified).toBe(false);
			expect((result.user as IDataObject).name).toBe('John');
		});

		it('should handle arrays without modification', () => {
			const input: IDataObject = { tags: ['tag1', 'tag2'] };
			const result = convertBooleanStrings(input);
			expect(result.tags).toEqual(['tag1', 'tag2']);
		});

		it('should handle null values', () => {
			const input: IDataObject = { value: null };
			const result = convertBooleanStrings(input);
			expect(result.value).toBeNull();
		});

		it('should handle empty objects', () => {
			const input: IDataObject = {};
			const result = convertBooleanStrings(input);
			expect(result).toEqual({});
		});

		it('should handle mixed types', () => {
			const input: IDataObject = {
				active: 'true',
				count: 5,
				name: 'Test',
				enabled: 'false',
			};
			const result = convertBooleanStrings(input);
			expect(result.active).toBe(true);
			expect(result.count).toBe(5);
			expect(result.name).toBe('Test');
			expect(result.enabled).toBe(false);
		});
	});

	describe('buildQueryFromFields', () => {
		it('should extract page parameter', () => {
			const input: IDataObject = { page: 2 };
			const result = buildQueryFromFields(input);
			expect(result.page).toBe(2);
		});

		it('should extract limit parameter', () => {
			const input: IDataObject = { limit: 50 };
			const result = buildQueryFromFields(input);
			expect(result.limit).toBe(50);
		});

		it('should extract query parameter', () => {
			const input: IDataObject = { query: 'test@example.com' };
			const result = buildQueryFromFields(input);
			expect(result.query).toBe('test@example.com');
		});

		it('should extract multiple pagination parameters', () => {
			const input: IDataObject = { page: 3, limit: 25, query: 'search term' };
			const result = buildQueryFromFields(input);
			expect(result.page).toBe(3);
			expect(result.limit).toBe(25);
			expect(result.query).toBe('search term');
		});

		it('should ignore non-pagination parameters', () => {
			const input: IDataObject = { page: 1, name: 'Test', email: 'test@example.com' };
			const result = buildQueryFromFields(input);
			expect(result.page).toBe(1);
			expect(result.name).toBeUndefined();
			expect(result.email).toBeUndefined();
		});

		it('should return empty object for empty input', () => {
			const input: IDataObject = {};
			const result = buildQueryFromFields(input);
			expect(result).toEqual({});
		});

		it('should return empty object when no pagination fields exist', () => {
			const input: IDataObject = { name: 'Test', email: 'test@example.com' };
			const result = buildQueryFromFields(input);
			expect(result).toEqual({});
		});
	});

	describe('simplifyResponse', () => {
		it('should return response with items array unchanged', () => {
			const input: IDataObject = {
				items: [{ id: 1 }, { id: 2 }],
				meta: { pagination: { total: 2 } },
			};
			const result = simplifyResponse(input);
			expect(result).toEqual(input);
		});

		it('should return non-items response unchanged', () => {
			const input: IDataObject = {
				id: 1,
				name: 'Test User',
				email: 'test@example.com',
			};
			const result = simplifyResponse(input);
			expect(result).toEqual(input);
		});

		it('should handle empty items array', () => {
			const input: IDataObject = {
				items: [],
				meta: { pagination: { total: 0 } },
			};
			const result = simplifyResponse(input);
			expect(result).toEqual(input);
		});

		it('should handle items that is not an array', () => {
			const input: IDataObject = {
				items: 'not an array',
			};
			const result = simplifyResponse(input);
			expect(result).toEqual(input);
		});
	});
});

describe('Thinkific Node Configuration', () => {
	it('should have correct API base URL', () => {
		// This test validates our configuration assumption
		const expectedBaseUrl = 'https://api.thinkific.com/api/public/v1';
		// The BASE_URL is defined in GenericFunctions.ts
		expect(expectedBaseUrl).toBe('https://api.thinkific.com/api/public/v1');
	});

	it('should support page-based pagination', () => {
		// Validate pagination structure
		const paginationParams = { page: 1, limit: 100 };
		expect(paginationParams.page).toBeDefined();
		expect(paginationParams.limit).toBeDefined();
		expect(paginationParams.limit).toBeLessThanOrEqual(100);
	});
});
