# Assignment-3

# Blog Project

**Live Deployment Link:** https://ph-assignment-3-snowy.vercel.app

## Overview

This is a blogging platform where users can write, update and delete their blogs. It has two roles: Admin and User. Admin can manage users and their blogs, while users can perform CRUD operations on their own blogs.
The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Technologies

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Features and Requirements

### 1. User Roles

#### Admin:

- Should be created manually in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating a property isBlocked.
- Cannot update any blog.

#### User:

- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.
- Cannot perform admin actions.

##

# instruction to setup the project locally

This repository is currently public. To setup this project locally follow the instruction
given below -

1. clone the repository
2. move into project directory
3. create an .env which must contain -
    1. PORT (in which port you want to run the project)
    2. HOSTNAME (provide a hostname like '127.0.0.1')
    3. DATABASE_URL (provide mongodb connection string with database name)
    4. NODE_ENV (provide environment if it is production or development)
    5. BCRYPT_SALT_ROUND (provide provide a number)
    6. JWT_ACCESS_SECRET (provide a key)
    7. JWT_REFRESH_SECRET (provide a key)
    8. JWT_ACCESS_EXPIRES_IN (provide time when access key will expire)
    9. JWT_REFRESH_EXPIRES_IN (provide time when refresh key will expire)
4. npm install (run this command)
5. npm run build ( run this command)
6. npm start (to start the server locally)

Now, project setup is done. Hit the api described below to get the expected result.

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

**Description:** Registers a new user with the platform. It validates user data and saves it to the database.

**Request Body:**

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**

- **Success (201):**

```json
{
    "success": true,
    "message": "User registered successfully",
    "statusCode": 201,
    "data": {
        "_id": "string",
        "name": "string",
        "email": "string"
    }
}
```

- **Failure (400):**

```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

####

#### 1.2 Login User

**POST** `/api/auth/login`

**Description:** Authenticates a user with their email and password and generates a JWT token.

**Request Body:**

```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**

- **Success (200):**

```json
{
    "success": true,
    "message": "Login successful",
    "statusCode": 200,
    "data": {
        "token": "string"
    }
}
```

- **Failure (401):**

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

###

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Description:** Allows a logged-in user to create a blog by providing a title and content.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
    "title": "My First Blog",
    "content": "This is the content of my blog."
}
```

**Response:**

- **Success (201):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Description:** Allows a logged-in user to update their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
    "title": "Updated Blog Title",
    "content": "Updated content."
}
```

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

**Description:** Allows a logged-in user to delete their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Response:**

- **Success (200):**

```json
{
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
}
```

####

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Description:** Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `author=authorId`).

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

In this example:

- `search=technology`: Filters blogs containing the term "technology" in the title or content.
- `sortBy=createdAt`: Sorts the blogs by the `createdAt` field.
- `sortOrder=desc`: Sorts in descending order (newest blogs first).
- `filter=60b8f42f9c2a3c9b7cbd4f18`: Filters blogs authored by the user with the given `authorId`.

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

###

### 3\. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
    "success": true,
    "message": "User blocked successfully",
    "statusCode": 200
}
```

####

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
}
```

---

#### Common Error Response Format

To maintain consistency across all API endpoints, the following error response structure has been used:

```json
{
    "success": false,
    "message": "Error message describing the issue",
    "statusCode": 400, // or other relevant HTTP status code
    "error": { "details": "Additional error details, if applicable" },
    "stack": "error stack trace, if available"
}
```

#### Types of Errors Handled

The following common errors has been managed with appropriate responses:

- **Zod Validation Error** (`ZOD_ERROR`): Errors arising from invalid data inputs based on Zod schema validation.
- **Not Found Error** (`NOT_FOUND_ERROR`): When requested resources (e.g., a user, item, or page) are not found.
- **Validation Error** (`VALIDATION_ERROR`): General validation errors (e.g., incorrect data format, missing required fields).
- **Authentication Error** (`AUTH_ERROR`): Issues related to failed authentication (e.g., invalid token or expired session).
- **Authorization Error** (`AUTHORIZATION_ERROR`): When the user lacks the necessary permissions to access a resource.
- **Internal Server Error** (`INTERNAL_SERVER_ERROR`): Unhandled errors or unexpected server issues.

By consistently implementing these error handling mechanisms, I ensure a smooth user experience and easier debugging.
