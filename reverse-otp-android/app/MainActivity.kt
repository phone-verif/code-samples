package com.example.reverseotpsample

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import okhttp3.*
import java.io.IOException

class MainActivity : AppCompatActivity() {

    val apiKey = "your_api_key" // Replace with your API key

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val startVerificationButton = findViewById<Button>(R.id.startVerificationButton)
        startVerificationButton.setOnClickListener {
            val sessionId = "user-123" // Replace with a unique session ID for each user
            startVerification(sessionId)
        }
    }

    fun startVerification(sessionId: String) {
        val client = OkHttpClient()

        val json = """{"session_id": "$sessionId", "api_key": "$apiKey"}"""
        val body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), json)

        val request = Request.Builder()
            .url("https://phone-verif.com/api/start-verification")
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("MainActivity", "Error: ", e)
            }

            override fun onResponse(call: Call, response: Response) {
                val responseBody = response.body()?.string()
                Log.d("MainActivity", "Start verification response: $responseBody")
                // In a real application, you would now display the QR code or the WhatsApp link to the user
                // and wait for them to complete the verification.
            }
        })
    }
}
