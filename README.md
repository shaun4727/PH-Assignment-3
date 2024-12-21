# Assignment-3

# Blog Project

## live URL:

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

## API Endpoints

#### 1. Authentication

##### 1.1 Register User

##### POST

##### Description:

Registers a new user with the platform. It validates user data and saves it to the database.

##### Request Body

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```
