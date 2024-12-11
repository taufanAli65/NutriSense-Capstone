package com.example.nutrisense

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import java.io.IOException

class UserDetailsActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_details)

        val nameEditText = findViewById<EditText>(R.id.nameEditText)
        val birthDateEditText = findViewById<EditText>(R.id.birthDateEditText)
        val heightEditText = findViewById<EditText>(R.id.heightEditText)
        val weightEditText = findViewById<EditText>(R.id.weightEditText)
        val targetWeightEditText = findViewById<EditText>(R.id.targetWeightEditText)
        val saveButton = findViewById<Button>(R.id.saveButton)

        saveButton.setOnClickListener {
            val name = nameEditText.text.toString()
            val birthDate = birthDateEditText.text.toString()
            val height = heightEditText.text.toString()
            val weight = weightEditText.text.toString()
            val targetWeight = targetWeightEditText.text.toString()
            saveUserDetails(name, birthDate, height, weight, targetWeight)
        }
    }

    private fun saveUserDetails(name: String, birthDate: String, height: String, weight: String, targetWeight: String) {
        val url = "https://{link}/api/update-details"
        val formBody = FormBody.Builder()
            .add("userId", FirebaseAuth.getInstance().currentUser?.uid ?: "")
            .add("name", name)
            .add("birthDate", birthDate)
            .add("height", height)
            .add("weight", weight)
            .add("targetWeight", targetWeight)
            .build()
        val request = Request.Builder()
            .url(url)
            .post(formBody)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    Toast.makeText(this@UserDetailsActivity, "Failed to save details: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                runOnUiThread {
                    if (response.isSuccessful) {
                        Toast.makeText(this@UserDetailsActivity, "Details saved successfully", Toast.LENGTH_SHORT).show()
                        // Navigate to the main activity or another activity
                    } else {
                        Toast.makeText(this@UserDetailsActivity, "Failed to save details: ${response.message}", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }
}
