# NutriSense-ML

This repository contains an image classification project that leverages transfer learning with the MobileNetV2 architecture. The model is trained to classify 33 different food categories, achieving 86% accuracy on the validation dataset.

---

## Dataset

The primary dataset is sourced from Kaggle: [Food Classification Dataset](https://www.kaggle.com/datasets/rizkyyk/dataset-food-classification). Additional images were collected using web scraping to improve the diversity and robustness of the dataset.

---

## Food Categories (33 Classes)

- Ayam Geprek  
- Ayam Goreng  
- Bakso  
- Bika Ambon  
- Bubur Ayam  
- Burger  
- Dadar Gulung  
- Gado-Gado  
- Getuk Lindri  
- Ikan Gurame Bakar  
- Ikan Mujair Bakar  
- Kentang Goreng  
- Kerak Telor  
- Klepon  
- Kue Lapis  
- Kue Sagu  
- Lemper Ayam  
- Martabak Manis  
- Mie Goreng  
- Nasi Gandul  
- Nasi Goreng  
- Nasi Kuning  
- Nasi Padang  
- Pempek  
- Pizza  
- Rawon  
- Rendang  
- Roti Bakar  
- Sate  
- Sate Usus  
- Serabi  
- Soto  
- Tahu Goreng  

---

## Model Architecture

The classification model is built upon MobileNetV2, a lightweight convolutional neural network architecture optimized for mobile and edge devices.

### Key Steps

#### 1. Load Pre-trained MobileNetV2:
- **Input shape**: (224, 224, 3)
- **Pre-trained weights**: ImageNet
- **Top layers removed** (`include_top=False`) for transfer learning.

#### 2. Freeze Layers:
- All layers are initially frozen.
- Only the last few layers starting from `block_16_expand` are set to be trainable to adapt the model to the new dataset.

#### 3. Add Custom Layers:
- **Flatten layer**: Converts feature maps to 1D.
- **Dense layers**:
  - First layer with 128 units and ReLU activation.
  - Second layer with 64 units and ReLU activation.
- **Dropout layer**: Dropout rate of 50% to reduce overfitting.
- **Output layer**: Softmax activation for multi-class classification with 33 categories.

#### 4. Regularization:
- L2 regularization applied to the output layer with a factor of 0.005.

---

## Training Process

The training process was conducted using Google Colab with GPU support. To improve the generalization of the model, data augmentation is applied to the training dataset using `ImageDataGenerator`.

### Augmentation Techniques Applied:
- **Rescaling**: Normalize pixel values to the range [0, 1].
- **Random rotations**: Up to 20 degrees.
- **Shifts**: Horizontal and vertical shifts up to 20% of the image.
- **Shear transformations**: Up to 10%.
- **Zoom**: Random zooming up to 10%.
- **Horizontal flipping**: Randomly flip images.
- **Fill mode**: Nearest pixels are used to fill gaps after transformations.

### Training Parameters:
- **Training Generator**: Augmented dataset created using `ImageDataGenerator`.
- **Validation Generator**: Rescaled dataset without augmentation.
- **Callbacks**:
  - EarlyStopping: Monitors validation loss and stops training if it does not improve for 10 consecutive epochs.
  - ReduceLROnPlateau: Reduces the learning rate by a factor of 0.5 if validation loss plateaus for 3 epochs.
- **Epochs**: Maximum of 50.

---

## Evaluation

The model achieved an accuracy of **86%** on the validation dataset.

### Metrics Monitored:
![image](https://github.com/user-attachments/assets/08901f71-6a28-4554-92dd-12332b0d462e)

---

## Deployment

The model was converted to TensorFlow Lite (TFLite) format for deployment in mobile applications.

### Steps to Deploy:
1. Save the trained model.
2. Convert to TFLite format.
3. Integrate into a mobile app for real-time classification.
