# n8n-nodes-thinkific

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Thinkific, enabling workflow automation for course management, user administration, enrollment processing, and e-commerce operations. This node integrates with Thinkific's REST API to automate tasks for online course creators and educators.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

## Features

- **Complete API Coverage**: 9 resource categories with 45+ operations
- **User Management**: Create, update, delete, and search users
- **Course Administration**: Access course content, chapters, and lessons
- **Enrollment Processing**: Manage student enrollments with full lifecycle support
- **E-commerce Integration**: Handle products, orders, promotions, and coupons
- **Group Management**: Create and manage learning groups
- **Webhook Support**: Real-time event triggers for automation workflows
- **Pagination Support**: Automatic handling of paginated API responses
- **Error Handling**: Comprehensive error handling with detailed messages

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-thinkific`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install the package
npm install n8n-nodes-thinkific

# Restart n8n
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-thinkific.git
cd n8n-nodes-thinkific

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-thinkific

# Restart n8n
```

## Credentials Setup

| Field | Description |
|-------|-------------|
| API Key | Your Thinkific API key from Settings → Code & analytics → API |
| Subdomain | Your Thinkific subdomain (e.g., "myschool" from myschool.thinkific.com) |

**Important**: The subdomain is case-sensitive.

## Resources & Operations

### Users

| Operation | Description |
|-----------|-------------|
| Create | Create a new user |
| Delete | Remove a user |
| Get | Get user by ID |
| Get by Email | Find user by email address |
| Get Many | List all users with pagination |
| Update | Update user details |

### Courses

| Operation | Description |
|-----------|-------------|
| Get | Get course by ID |
| Get Chapters | List all chapters in a course |
| Get Contents | List all content in a course |
| Get Lessons | List lessons in a chapter |
| Get Many | List all courses |

### Enrollments

| Operation | Description |
|-----------|-------------|
| Create | Enroll a user in a course |
| Delete | Remove an enrollment |
| Expire | Set enrollment expiry date |
| Get | Get enrollment by ID |
| Get by Course | Get enrollments for a course |
| Get by User | Get enrollments for a user |
| Get Many | List all enrollments |
| Update | Update enrollment details |

### Products

| Operation | Description |
|-----------|-------------|
| Get | Get product by ID |
| Get Courses | Get courses in a product |
| Get Many | List all products |
| Get Prices | Get product pricing |

### Orders

| Operation | Description |
|-----------|-------------|
| Create External | Create external order (bypasses Thinkific checkout) |
| Get | Get order by ID |
| Get Many | List all orders |
| Refund | Process order refund |

### Promotions

| Operation | Description |
|-----------|-------------|
| Create | Create a new promotion |
| Delete | Remove a promotion |
| Get | Get promotion by ID |
| Get Many | List all promotions |
| Update | Update promotion details |

### Coupons

| Operation | Description |
|-----------|-------------|
| Create | Create a new coupon |
| Delete | Remove a coupon |
| Get | Get coupon by ID |
| Get Many | List all coupons |
| Update | Update coupon details |
| Validate | Check if coupon code is valid |

### Groups

| Operation | Description |
|-----------|-------------|
| Add Users | Add users to a group |
| Create | Create a new group |
| Get | Get group by ID |
| Get Analysts | List group analysts |
| Get Many | List all groups |
| Remove User | Remove user from group |

### Webhooks

| Operation | Description |
|-----------|-------------|
| Create | Register a new webhook |
| Delete | Remove a webhook |
| Get Many | List all webhooks |
| Update | Update webhook configuration |

## Trigger Node

The **Thinkific Trigger** node enables real-time workflow automation based on Thinkific events:

| Event | Description |
|-------|-------------|
| user.created | New user registration |
| user.updated | User profile updated |
| user.signin | User sign in |
| enrollment.created | New enrollment |
| enrollment.completed | Enrollment completed |
| order.created | New order placed |
| order.completed | Order completed |
| course.completed | Course completion |
| lesson.completed | Lesson completion |
| chapter.completed | Chapter completion |

## Usage Examples

### Enroll User in Course

```javascript
// Node: Thinkific
// Resource: Enrollment
// Operation: Create

{
  "userId": "12345",
  "courseId": "67890",
  "additionalFields": {
    "activated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Create External Order

```javascript
// Node: Thinkific
// Resource: Order
// Operation: Create External

{
  "userId": "12345",
  "productId": "67890",
  "paymentProvider": "stripe",
  "additionalFields": {
    "amount_cents": 9900,
    "billing_name": "John Doe"
  }
}
```

### Create Promotion with Coupon

```javascript
// Step 1: Create Promotion
// Resource: Promotion, Operation: Create
{
  "name": "Summer Sale",
  "discountType": "percentage",
  "discountAmount": 20
}

// Step 2: Create Coupon
// Resource: Coupon, Operation: Create
{
  "code": "SUMMER20",
  "promotionId": "{{ $json.id }}",
  "additionalFields": {
    "quantity": 100
  }
}
```

## Thinkific Concepts

### Products vs Courses

In Thinkific, a **Product** is what customers purchase, while a **Course** is the content they access. A product can contain multiple courses, and the same course can be part of multiple products.

### External Orders

External orders allow you to record sales made outside of Thinkific's checkout (e.g., through Stripe, PayPal direct, or custom checkout). This enrolls the user while tracking the sale.

### Enrollments

Enrollments represent the relationship between a user and a course. They track progress, completion status, and can have expiry dates for time-limited access.

## Rate Limits

Thinkific API has a rate limit of **120 requests per minute**. The node handles pagination automatically but be mindful of rate limits when processing large datasets.

## Error Handling

The node provides detailed error messages for common scenarios:

| Status Code | Description |
|-------------|-------------|
| 401 | Invalid API key |
| 403 | Forbidden - check permissions |
| 404 | Resource not found |
| 422 | Validation error - check input data |
| 429 | Rate limited - wait before retrying |

## Security Best Practices

1. Store API credentials securely in n8n's credential manager
2. Use minimal required permissions for API keys
3. Rotate API keys periodically
4. Monitor webhook endpoints for unauthorized access
5. Validate webhook payloads in production workflows

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Format code
npm run format
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

- **Documentation**: [Thinkific API Docs](https://developers.thinkific.com/api/api-documentation/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-thinkific/issues)
- **Email**: licensing@velobpa.com

## Acknowledgments

- [Thinkific](https://www.thinkific.com/) for their comprehensive API
- [n8n](https://n8n.io/) for the automation platform
- The n8n community for inspiration and support
