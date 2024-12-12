# NutriSense-Capstone
For bangkit capstone project team

## API Endpoints

### Auth Routes

#### POST /signup
- **Description**: Sign up a new user and send a verification email.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Responses**:
  - `201 Created`: Sign up successful, verification email sent.
  - `500 Internal Server Error`: An error occurred during sign up.

#### POST /login
- **Description**: Log in an existing user.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Responses**:
  - `200 OK`: Login successful, returns an ID token.
  - `500 Internal Server Error`: An error occurred during login.

#### POST /reset-password
- **Description**: Send a password reset email to the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: Password reset email sent.
  - `400 Bad Request`: Invalid email format.
  - `500 Internal Server Error`: An error occurred during password reset.
