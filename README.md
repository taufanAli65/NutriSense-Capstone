# NutriSense-Capstone
For bangkit capstone project team C242-PS060 

## Project Background
Indonesia faces significant challenges in addressing nutritional issues. Recent data reveals that approximately 21 million Indonesians suffer from malnutrition, and 21.6% of children are stunting. Stunting, caused by chronic malnutrition, significantly impacts physical growth and cognitive development. NutriSense is an Android-based application designed to help users monitor their daily nutritional intake in an easy way. This app allows users to scan food. Based on the processed data, NutriSense provides information on whether the user’s daily nutritional needs have been met. With this approach, NutriSense not only serves as a tracker but also as a guide to support a healthy lifestyle and balanced nutritional intake. This initiative aligns with Indonesia’s ongoing efforts to tackle nutritional challenges and supports global objectives, such as those outlined by the World Health Assembly and the Sustainable Development Goals (SDGs).

## Branch Information
The `NutriSense-API` branch is built using:
- **Express.js**: For creating the server and handling API routes.
- **Firestore**: As the database for storing user and nutrition data.
- **Firebase Auth**: For user authentication and authorization.
- [Link](https://github.com/taufanAli65/NutriSense-Capstone/tree/NutriSense-API?tab=readme-ov-file#branch-information)

The `NutriSense-ML` branch is built using:
- **TensorFlow**: For building and training the image classification model using transfer learning.
- **MobileNetV2**: As the base architecture for lightweight and efficient image classification.
- **ImageDataGenerator**: For applying data augmentation techniques to improve model generalization.
- **Google Colab**: As the platform for model training with GPU acceleration.
- **TensorFlow Lite (TFLite)**: For converting and optimizing the trained model for mobile deployment
- [Link](https://github.com/taufanAli65/NutriSense-Capstone/tree/NutriSense-ML?tab=readme-ov-file#nutrisense-ml)

The `NutriSense-MD` branch is built using:
- **Retrofit**: For making HTTP requests to the API.
- **Room**: For local database storage.
- **CameraX**: For capturing food images.
- **Figma**: For UI/UX design.
- **Firebase**: For backend services.
- **Gradle Build Tools**: For building the project.
- [Link](https://github.com/taufanAli65/NutriSense-Capstone/tree/NutriSense-MD?tab=readme-ov-file)

## Team Composition

| **Name**                          | **Student ID**     | **Learning Path**    | **Contribution/Task**                                                                                                                                                                                |
|-----------------------------------|--------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Adelia Siska Ayu**   | M179B4KX0085        | Machine Learning     |Debugging and training machine learning models, ensuring code reliability and optimizing model performance|
| **Alwan Rofail Qodri**               | M487B4KY0438       | Machine Learning     |crawling and cleaning data to add datasets using visual studio code with GoogleImageCrawl|
| **Quiin Latifah Almatin Lubis**      | M183B4KX3546       | Machine Learning     | Collecting data and traning models with mobilenetv2 |
| **Andrian Nur Prima Saputra**          | C487B4KY0530       | Cloud Computing   | Developed an API for processing the model and integrate it with the main API and deploy it on Google Cloud Platform using App Engine.|
| **Taufan Ali**           | C179B4KY4295       | Cloud Computing   | Develop an API for managing an application system using Express.js, Firestore for the database, and Firebase Authentication for user authentication and deploy it using app engine.|
| **Muhammad Umar Hatta**                 | A179B4KY3110       | Mobile Development      |  Build the application using kotlin so that it can run smoothly and integrate the API from the CC part |