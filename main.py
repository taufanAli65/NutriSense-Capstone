import tensorflow as tf
from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
import pandas as pd

# Inisialisasi Flask
app = Flask(__name__)

# Memuat model TensorFlow Lite
interpreter = tf.lite.Interpreter(model_path="./foodnutrition.tflite")
interpreter.allocate_tensors()

# Mendapatkan input dan output tensor details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Membaca file CSV yang berisi nama makanan dan kandungan nutrisinya
nutrition_df = pd.read_csv('./DataNutrisi.csv')

# Membuat dictionary untuk map nama makanan ke informasi nutrisi
nutrition_info = nutrition_df.set_index('nama makanan').T.to_dict('dict')

# Menyusun daftar nama makanan untuk prediksi
class_names = nutrition_df['nama makanan'].tolist()

def preprocess_image(image: Image.Image, target_size=(224, 224)):
    """
    Fungsi untuk mengubah gambar menjadi input yang sesuai dengan model (misalnya 224x224 RGB)
    """
    image = image.resize(target_size)
    image = np.array(image) / 255.0  # Normalisasi antara 0 dan 1
    image = np.expand_dims(image, axis=0).astype(np.float32)  # Tambahkan dimensi batch
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Membaca gambar
    image = Image.open(file.stream)

    # Preprocess gambar untuk model
    input_data = preprocess_image(image)

    # Memasukkan input ke dalam model
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()

    # Mengambil hasil output
    output_data = interpreter.get_tensor(output_details[0]['index'])

    # Mengembalikan hasil prediksi (misalnya kelas dengan nilai tertinggi)
    prediction = output_data[0]
    predicted_class = np.argmax(prediction)
    confidence = prediction[predicted_class]

    # Menentukan nama makanan yang diprediksi
    predicted_name = class_names[predicted_class]

    # Mendapatkan informasi nutrisi dari dictionary
    nutrition = nutrition_info.get(predicted_name, {})

    # Menyusun output sesuai format yang diminta
    result = {
        'kalori': nutrition.get('kalori', 0.0),
        'karbohidrat': nutrition.get('karbohidrat', 0.0),
        'lemak': nutrition.get('lemak', 0.0),
        'protein': nutrition.get('protein', 0.0),
        'name': predicted_name
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)