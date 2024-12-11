package com.example.nutrisense

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.FirebaseApp
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var greetingTextView: TextView
    private lateinit var dataTextView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        FirebaseApp.initializeApp(this) // Initialize Firebase
        auth = FirebaseAuth.getInstance()
        greetingTextView = findViewById(R.id.greetingTextView)
        dataTextView = findViewById(R.id.dataTextView)

        val user = auth.currentUser
        user?.let {
            val username = it.displayName ?: "User"
            greetingTextView.text = getGreetingMessage(username)
            fetchDataFromLink()
        }
    }

    private fun getGreetingMessage(username: String): String {
        val calendar = Calendar.getInstance()
        val hour = calendar.get(Calendar.HOUR_OF_DAY)
        return when (hour) {
            in 0..11 -> "Good morning, $username"
            in 12..17 -> "Good afternoon, $username"
            else -> "Good night, $username"
        }
    }

    private fun fetchDataFromLink() {
        // Replace with actual data fetching logic
        val data = "Data fetched from https://${link}"
        dataTextView.text = data
    }
}