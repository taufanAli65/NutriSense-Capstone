import tensorflow as tf

interpreter = tf.lite.Interpreter(model_path="./foodnutrition.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Print model input/output details
print("Input details:", input_details)
print("Output details:", output_details)

# Test with dummy data (adjust input size and shape as required)
import numpy as np
dummy_input = np.zeros(input_details[0]['shape'], dtype=np.float32)
interpreter.set_tensor(input_details[0]['index'], dummy_input)

interpreter.invoke()

output_data = interpreter.get_tensor(output_details[0]['index'])
print("Output data:", output_data)
