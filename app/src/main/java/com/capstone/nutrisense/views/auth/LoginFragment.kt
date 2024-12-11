package com.capstone.nutrisense.views.auth

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.capstone.nutrisense.R
import com.capstone.nutrisense.views.auth.authviews.EmailEditText
import com.capstone.nutrisense.views.auth.authviews.LoginButton
import com.capstone.nutrisense.views.auth.authviews.PasswordEditText

class LoginFragment : Fragment() {
    private var binding = null
    private lateinit var emailEditText: EmailEditText
    private lateinit var passwordEditText: PasswordEditText
    private lateinit var loginButton: LoginButton

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_login, container, false)
        return view
    }

    override fun onDestroy() {
        super.onDestroy()
        binding = null
    }

}