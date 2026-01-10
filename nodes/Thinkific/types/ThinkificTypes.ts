/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

// API Response Types
export interface IThinkificPagination {
	current_page: number;
	next_page: number | null;
	prev_page: number | null;
	total_pages: number;
	total_items: number;
}

export interface IThinkificResponse<T> {
	items: T[];
	meta: {
		pagination: IThinkificPagination;
	};
}

export interface IThinkificError {
	error: string;
	errors?: string[];
}

// User Types
export interface IThinkificUser {
	id: number;
	created_at: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	company: string;
	headline: string;
	bio: string;
	affiliate_code: string;
	affiliate_commission: number;
	affiliate_commission_type: string;
	affiliate_payout_email: string;
	avatar_url: string;
	external_source: string;
	roles: string[];
	custom_profile_fields: ICustomProfileField[];
}

export interface ICustomProfileField {
	id: number;
	value: string;
	label: string;
}

export interface IUserCreateParams {
	email: string;
	first_name?: string;
	last_name?: string;
	password?: string;
	send_welcome_email?: boolean;
	roles?: string[];
	custom_profile_fields?: Array<{
		id: number;
		value: string;
	}>;
	company?: string;
	headline?: string;
	bio?: string;
	external_source?: string;
}

// Course Types
export interface IThinkificCourse {
	id: number;
	name: string;
	slug: string;
	subtitle: string;
	product_id: number;
	description: string;
	intro_video_youtube: string;
	contact_information: string;
	keywords: string;
	duration: string;
	banner_image_url: string;
	course_card_image_url: string;
	instructor_id: number;
	administrator_user_ids: number[];
	user_id: number;
	reviews_enabled: boolean;
	chapter_ids: number[];
	created_at: string;
	updated_at: string;
}

export interface IThinkificChapter {
	id: number;
	name: string;
	position: number;
	description: string;
	duration: string;
	content_ids: number[];
	course_id: number;
	created_at: string;
	updated_at: string;
}

export interface IThinkificContent {
	id: number;
	name: string;
	slug: string;
	content_type: string;
	chapter_id: number;
	position: number;
	free: boolean;
	created_at: string;
	updated_at: string;
}

// Enrollment Types
export interface IThinkificEnrollment {
	id: number;
	created_at: string;
	updated_at: string;
	completed: boolean;
	completed_at: string | null;
	activated_at: string;
	started_at: string | null;
	percentage_completed: number;
	expired: boolean;
	expiry_date: string | null;
	is_free_trial: boolean;
	user_email: string;
	user_name: string;
	user_id: number;
	course_name: string;
	course_id: number;
}

export interface IEnrollmentCreateParams {
	user_id: number;
	course_id: number;
	activated_at?: string;
	expiry_date?: string;
}

// Product Types
export interface IThinkificProduct {
	id: number;
	created_at: string;
	name: string;
	description: string;
	slug: string;
	status: string;
	collection_ids: number[];
	course_ids: number[];
	related_product_ids: number[];
	subscription: boolean;
	position: number;
	private: boolean;
	hidden: boolean;
	keywords: string;
	seo_title: string;
	seo_description: string;
	card_image_url: string;
}

export interface IThinkificPrice {
	id: number;
	price: string;
	currency: string;
	label: string;
	is_primary: boolean;
	product_id: number;
	payment_type: string;
	days_until_expiry: number | null;
}

// Order Types
export interface IThinkificOrder {
	id: number;
	created_at: string;
	amount_cents: number;
	amount_dollars: string;
	billing_name: string;
	coupon_code: string | null;
	coupon_id: number | null;
	payment_type: string;
	product_id: number;
	product_name: string;
	status: string;
	user_id: number;
	user_email: string;
	user_name: string;
	affiliate_referral_code: string | null;
	product_ids: number[];
	subscription_id: number | null;
}

export interface IExternalOrderParams {
	user_id: number;
	product_id: number;
	payment_provider: string;
	amount_cents?: number;
	coupon_code?: string;
	billing_name?: string;
}

// Promotion Types
export interface IThinkificPromotion {
	id: number;
	name: string;
	description: string;
	discount_type: string;
	discount_amount: string;
	starts_at: string | null;
	expires_at: string | null;
	product_ids: number[];
	coupon_ids: number[];
	created_at: string;
	updated_at: string;
}

export interface IPromotionCreateParams {
	name: string;
	description?: string;
	discount_type: 'percentage' | 'fixed';
	discount_amount: number;
	starts_at?: string;
	expires_at?: string;
	product_ids?: number[];
}

// Coupon Types
export interface IThinkificCoupon {
	id: number;
	code: string;
	quantity: number | null;
	quantity_used: number;
	note: string;
	duration_in_months: number | null;
	promotion_id: number;
	created_at: string;
	updated_at: string;
}

export interface ICouponCreateParams {
	code: string;
	promotion_id: number;
	quantity?: number;
	duration_in_months?: number;
	note?: string;
}

// Group Types
export interface IThinkificGroup {
	id: number;
	name: string;
	token: string;
	created_at: string;
	updated_at: string;
}

export interface IGroupAnalyst {
	id: number;
	user_id: number;
	group_id: number;
	created_at: string;
}

// Webhook Types
export interface IThinkificWebhook {
	id: number;
	topic: string;
	target_url: string;
	created_at: string;
	updated_at: string;
}

export interface IWebhookCreateParams {
	topic: string;
	target_url: string;
}

export type ThinkificWebhookTopic =
	| 'user.created'
	| 'user.updated'
	| 'user.signin'
	| 'enrollment.created'
	| 'enrollment.completed'
	| 'order.created'
	| 'order.completed'
	| 'course.completed'
	| 'lesson.completed'
	| 'chapter.completed';

// Resource Types
export type ThinkificResource =
	| 'user'
	| 'course'
	| 'enrollment'
	| 'product'
	| 'order'
	| 'promotion'
	| 'coupon'
	| 'group'
	| 'webhook';
