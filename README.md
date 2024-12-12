# NutriSense-Capstone
For bangkit capstone project team

## Table of Contents
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Filter Routes](#filter-routes)
  - [Root Routes](#root-routes)
  - [Nutrition Routes](#nutrition-routes)
  - [User Routes](#user-routes)

## API Endpoints

### Auth Routes

#### POST /auth/signup
- **Description**: Sign up a new user and send a verification email.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Responses**:
  - `201 Created`: Sign up successful, verification email sent.
  - `500 Internal Server Error`: An error occurred during sign up.

#### POST /auth/login
- **Description**: Log in an existing user.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Responses**:
  - `200 OK`: Login successful, returns an ID token.
  - `500 Internal Server Error`: An error occurred during login.

#### POST /auth/reset-password
- **Description**: Send a password reset email to the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: Password reset email sent.
  - `400 Bad Request`: Invalid email format.
  - `500 Internal Server Error`: An error occurred during password reset.

### Filter Routes

#### GET /filter?month
- **Description**: Get data for a specific month.
- **Query Parameters**:
  - `month` (number): Month number (1-12).
- **Responses**:
  - `200 OK`: Returns data for the specified month.
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /filter?date
- **Description**: Get data for a specific date.
- **Query Parameters**:
  - `date` (string): Date in `DD-MM-YYYY` format.
- **Responses**:
  - `200 OK`: Returns data for the specified date.
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /filter?month&week
- **Description**: Get data for a specific week of a month.
- **Query Parameters**:
  - `month` (number): Month number (1-12).
  - `week` (number): Week number (1-4).
- **Responses**:
  - `200 OK`: Returns data for the specified week.
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /filter?year
- **Description**: Get data for a specific year.
- **Query Parameters**:
  - `year` (number): Year.
- **Responses**:
  - `200 OK`: Returns data for the specified year.
  - `500 Internal Server Error`: An error occurred while fetching data.

### Root Routes

#### GET /
- **Description**: Get nutrition data for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: Get Data Success, returns nutrition data.
  - `404 Not Found`: No data found.
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /sort/:date
- **Description**: Get nutrition data for the authenticated user by date.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `date` (string): Date in `YYYY-MM-DD` format.
- **Responses**:
  - `200 OK`: Data Fetched Successfully, returns nutrition data for the specified date.
  - `500 Internal Server Error`: An error occurred while fetching data.

### Nutrition Routes

#### POST /nutrition
- **Description**: Add new nutrition data for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Request Body**:
  - `name` (string): Name of the nutrition data.
  - Other nutrition data fields.
- **Responses**:
  - `200 OK`: Data Added Successfully, returns the added data.
  - `400 Bad Request`: Name is required.
  - `500 Internal Server Error`: An error occurred while adding data.

#### GET /nutrition/:id
- **Description**: Get nutrition data by ID for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `id` (string): ID of the nutrition data.
- **Responses**:
  - `200 OK`: Get Data Success, returns the nutrition data.
  - `500 Internal Server Error`: An error occurred while fetching data.

#### PUT /nutrition/:id
- **Description**: Update nutrition data by ID for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `id` (string): ID of the nutrition data.
- **Request Body**:
  - Updated nutrition data fields.
- **Responses**:
  - `200 OK`: Data Successfully Updated, returns the updated data.
  - `500 Internal Server Error`: An error occurred while updating data.

#### DELETE /nutrition/:id
- **Description**: Delete nutrition data by ID for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `id` (string): ID of the nutrition data.
- **Responses**:
  - `200 OK`: Data Deleted Successfully.
  - `500 Internal Server Error`: An error occurred while deleting data.

#### GET /nutrition/:foods/:year/:month?/:week?/:day?
- **Description**: Get nutrition data by food name and date for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `foods` (string): Name of the food.
  - `year` (string): Year.
  - `month` (string, optional): Month.
  - `week` (string, optional): Week.
  - `day` (string, optional): Day.
- **Responses**:
  - `200 OK`: Get Data Success, returns the nutrition data.
  - `500 Internal Server Error`: An error occurred while fetching data.

### User Routes

#### GET /user
- **Description**: Get user information for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: Returns user information.
  - `500 Internal Server Error`: An error occurred while fetching user information.

#### PUT /user/update
- **Description**: Update user information for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Request Body**:
  - `name` (string): User's name.
  - `birthdate` (string): User's birthdate in `DD-MM-YYYY` format.
  - `currentHeight` (number): User's current height.
  - `currentWeight` (number): User's current weight.
  - `targetWeight` (number, optional): User's target weight.
- **Responses**:
  - `200 OK`: User information updated successfully.
  - `400 Bad Request`: Invalid birthdate format.
  - `500 Internal Server Error`: An error occurred while updating user information.

#### POST /user/upload
- **Description**: Upload a profile photo for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Request Body**:
  - `profilePhoto` (file): Profile photo file to upload.
- **Responses**:
  - `200 OK`: Profile photo uploaded successfully, returns the photo URL.
  - `400 Bad Request`: No file uploaded.
  - `500 Internal Server Error`: An error occurred while uploading the file.
