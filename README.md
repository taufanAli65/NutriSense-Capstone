# NutriSense-Capstone
For bangkit capstone project team C242-PS060 

## Branch Information
The `NutriSense-API` branch is built using:
- **Express.js**: For creating the server and handling API routes.
- **Firestore**: As the database for storing user and nutrition data.
- **Firebase Auth**: For user authentication and authorization.

## Mobile Development Tools & Libraries
- Android Studio
- Retrofit
- Room
- CameraX
- Figma
- Firebase

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
  - `201 Created`: 
    ```json
    {
      "message": "Sign Up Success. Verification email sent.",
      "data": {
        "uid": "dLswwdcCZbPhN1I5pqosutS8Opx2",
        "email": "taufanali65@gmail.com",
        "emailVerified": false,
        "disabled": false,
        "metadata": {
          "lastSignInTime": null,
          "creationTime": "Mon, 16 Dec 2024 06:21:28 GMT",
          "lastRefreshTime": null
        },
        "tokensValidAfterTime": "Mon, 16 Dec 2024 06:21:28 GMT",
        "providerData": [
          {
            "uid": "taufanali65@gmail.com",
            "email": "taufanali65@gmail.com",
            "providerId": "password"
          }
        ]
      }
    }
    ```
  - `500 Internal Server Error`: An error occurred during sign up.

#### POST /auth/login
- **Description**: Log in an existing user.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Login Success",
      "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnV0cmlzZW5zZS1kZGQ4OSIsImF1ZCI6Im51dHJpc2Vuc2UtZGRkODkiLCJhdXRoX3RpbWUiOjE3MzQzMzAxNjcsInVzZXJfaWQiOiJkTHN3d2RjQ1piUGhOMUk1cHFvc3V0UzhPcHgyIiwic3ViIjoiZExzd3dkY0NaYlBoTjFJNXBxb3N1dFM4T3B4MiIsImlhdCI6MTczNDMzMDE2NywiZXhwIjoxNzM0MzMzNzY3LCJlbWFpbCI6InRhdWZhbmFsaTY1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0YXVmYW5hbGk2NUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.BJeHINq1Y6OcNw2Y65usQAFzKtBRLAdMX0JR86m8qymJWCsZSax5JgTp7i9lphbV_qV3vUS4FnCEd83_7gYO7XqEd0VCwSRP18JhV9qXpPZmaD7-lPyVXJ-sSmAR9yXANIy8pDJs9GeMENLf6pGef0p49AhfPQ6HJMPCOLJLkzvVK0eQ70zjlnAQdOWYHRFuO-scgwBymGQBGPFchEcyM-vd4RDSDn0uBVKzH-7Y3DG8XI_IYqFet_FQJaS538Le57Zov8Kk1iGDxWbZnbdud4oSrYRW20xPOzLC_RliknYyQQmL_l7Mo-7_6xcpgVm8P_uuElSOfkCwoncdTtfMFQ"
    }
    ```
  - `500 Internal Server Error`: An error occurred during login.

#### POST /auth/reset-password
- **Description**: Send a password reset email to the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Password reset email sent"
    }
    ```
  - `400 Bad Request`: Invalid email format.
  - `500 Internal Server Error`: An error occurred during password reset.

### Filter Routes

#### GET /filter?month
- **Description**: Get data for a specific month.
- **Query Parameters**:
  - `month` (number): Month number (1-12).
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Fetched Successfully",
      "data": [
        {
          "date": "12-12-2024",
          "carbs": 75,
          "protein": 1.5,
          "fat": 0.8999999999999999,
          "calories": 285
        }
      ]
    }
    ```
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /filter?date
- **Description**: Get data for a specific date.
- **Query Parameters**:
  - `date` (string): Date in `DD-MM-YYYY` format.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Fetched Successfully",
      "data": [
        {
          "date": "12-12-2024",
          "carbs": 75,
          "protein": 1.5,
          "fat": 0.8999999999999999,
          "calories": 285
        }
      ]
    }
    ```
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /filter?month&week
- **Description**: Get data for a specific week of a month.
- **Query Parameters**:
  - `month` (number): Month number (1-12).
  - `week` (number): Week number (1-4).
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Fetched Successfully",
      "data": [
        {
          "date": "12-12-2024",
          "carbs": 75,
          "protein": 1.5,
          "fat": 0.8999999999999999,
          "calories": 285
        }
      ]
    }
    ```
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /filter?year
- **Description**: Get data for a specific year.
- **Query Parameters**:
  - `year` (number): Year.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Fetched Successfully",
      "data": [
        {
          "date": "12-12-2024",
          "carbs": 75,
          "protein": 1.5,
          "fat": 0.8999999999999999,
          "calories": 285
        }
      ]
    }
    ```
  - `500 Internal Server Error`: An error occurred while fetching data.

### Root Routes

#### GET /
- **Description**: Get nutrition data for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Get Data Success",
      "data": [
        {
          "id": "JF3knMGSHVeqiuOcWKy613gelZr1-ayambawang-2024-12-12:19.00",
          "name": "ayam bawang",
          "calories": 95,
          "carbs": 25,
          "fat": 0.3,
          "protein": 0.5,
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:19.00"
        },
        {
          "id": "JF3knMGSHVeqiuOcWKy613gelZr1-ayambawang-2024-12-12:19.01",
          "name": "ayam bawang",
          "calories": 95,
          "carbs": 25,
          "fat": 0.3,
          "protein": 0.5,
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:19.01"
        },
        {
          "id": "JF3knMGSHVeqiuOcWKy613gelZr1-bakso-2024-12-12:13.41",
          "name": "bakso",
          "calories": 95,
          "protein": 0.5,
          "carbs": 25,
          "fat": 0.3,
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:13.41"
        },
        {
          "id": "JF3knMGSHVeqiuOcWKy613gelZr1-sate-2024-12-12:04.10",
          "name": "sate",
          "type": "food",
          "calories": "99",
          "foodPicUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/foods/13-12-2024/sate-13-12-2024",
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:04.10"
        },
        {
          "id": "JF3knMGSHVeqiuOcWKy613gelZr1-sate-2024-12-12:04.14",
          "name": "sate",
          "type": "food",
          "calories": "99",
          "foodPicUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/foods/13-12-2024/sate-13-12-2024-1",
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:04.14"
        }
      ]
    }
    ```
  - `404 Not Found`: No data found.
  - `500 Internal Server Error`: An error occurred while fetching data.

#### GET /sort/:date
- **Description**: Get nutrition data for the authenticated user by date.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `date` (string): Date in `YYYY-MM-DD` format.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Fetched Successfully",
      "data": {
        "id": "12-12-2024",
        "date": "12-12-2024",
        "carbs": 75,
        "protein": 1.5,
        "fat": 0.8999999999999999,
        "calories": 285
      }
    }
    ```
  - `500 Internal Server Error`: An error occurred while fetching data.

### Nutrition Routes

#### POST /nutrition
- **Description**: Add new nutrition data for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Request Body**:
  - `name` (string): Name of the nutrition data.
  - `foodPic` (file): Food picture file to upload.
  - `type` (string): food
  - other data (such as carbs, protein, etc).
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Added Successfully",
      "data": {
        "name": "sate",
        "type": "food",
        "protein": "99",
        "foodPicUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/foods/16-12-2024/sate-16-12-2024",
        "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
        "date": "2024-12-16:13.45"
      }
    }
    ```
  - `400 Bad Request`: Name is required or No file uploaded.
  - `500 Internal Server Error`: An error occurred while adding data.

#### GET /nutrition/:id
- **Description**: Get nutrition data by ID for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `id` (string): ID of the nutrition data.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Get Data Success",
      "data": {
        "id": "JF3knMGSHVeqiuOcWKy613gelZr1-sate-2024-12-16:13.45",
        "name": "sate",
        "type": "food",
        "protein": "99",
        "foodPicUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/foods/16-12-2024/sate-16-12-2024",
        "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
        "date": "2024-12-16:13.45"
      }
    }
    ```
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
  - `200 OK`: 
    ```json
    {
      "message": "Data Successfully Updated",
      "data_added": {
        "protein": 8
      }
    }
    ```
  - `500 Internal Server Error`: An error occurred while updating data.

#### DELETE /nutrition/:id
- **Description**: Delete nutrition data by ID for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Path Parameters**:
  - `id` (string): ID of the nutrition data.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Data Deleted Successfully"
    }
    ```
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
  - `200 OK`: 
    ```json
    {
      "message": "Get Data Success",
      "data": [
        {
          "name": "ayam bawang",
          "calories": 95,
          "carbs": 25,
          "fat": 0.3,
          "protein": 0.5,
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:19.00"
        },
        {
          "name": "ayam bawang",
          "calories": 95,
          "carbs": 25,
          "fat": 0.3,
          "protein": 0.5,
          "user_id": "JF3knMGSHVeqiuOcWKy613gelZr1",
          "date": "2024-12-12:19.01"
        }
      ]
    }
    ```
  - `500 Internal Server Error`: An error occurred while fetching data.

### User Routes

#### GET /user
- **Description**: Get user information for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "id": "JF3knMGSHVeqiuOcWKy613gelZr1",
      "name": "Taufan Ali",
      "birthdate": "15-06-2000",
      "currentHeight": 175,
      "currentWeight": 70.5,
      "userTargetWeight": 65,
      "profilePhotoUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/photoProfile/JF3knMGSHVeqiuOcWKy613gelZr1"
    }
    ```
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
  - `200 OK`: 
    ```json
    {
      "message": "User updated successfully",
      "data": {
        "name": "Taufan Ali",
        "birthdate": "15-06-2000",
        "profilePhotoUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/photoProfile/JF3knMGSHVeqiuOcWKy613gelZr1",
        "currentWeight": 65,
        "userTargetWeight": null,
        "currentHeight": 167
      }
    }
    ```
  - `400 Bad Request`: Invalid birthdate format.
  - `500 Internal Server Error`: An error occurred while updating user information.

#### POST /user/upload
- **Description**: Upload a profile photo for the authenticated user.
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Request Body**:
  - `profilePhoto` (file): Profile photo file to upload.
  - `type` (string): profile
- **Responses**:
  - `200 OK`: 
    ```json
    {
      "message": "Profile photo uploaded successfully.",
      "profilePhotoUrl": "https://storage.googleapis.com/nutrisense-ddd89.firebasestorage.app/JF3knMGSHVeqiuOcWKy613gelZr1/photoProfile/JF3knMGSHVeqiuOcWKy613gelZr1-1"
    }
    ```
  - `400 Bad Request`: No file uploaded.
  - `500 Internal Server Error`: An error occurred while uploading the file.
