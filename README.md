# NutriSense-Capstone
For bangkit capstone project team

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
