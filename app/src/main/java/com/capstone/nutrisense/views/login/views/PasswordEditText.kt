@file:Suppress("PrivatePropertyName")

package com.capstone.nutrisense.views.login.views

import android.content.Context
import android.graphics.Canvas
import android.util.AttributeSet
import android.view.View
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.content.ContextCompat
import androidx.core.widget.addTextChangedListener
import com.capstone.nutrisense.R

@Suppress(
    "PrivatePropertyName"
)
class PasswordEditText @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null
) : AppCompatEditText(context, attrs) {
    private val MIN_PASSWORD_LENGTH = 8

    init {
        setPaddingRelative(30, 20, 50, 20)

        addTextChangedListener { password ->
            if (password != null) {
                validatePassword(password.toString())
            }
        }
        setupStyle()
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        hint = context.getString(R.string.password_hint)
        textAlignment = View.TEXT_ALIGNMENT_VIEW_START
    }

    private fun validatePassword(password: String) {
        error = when {
            password.length < MIN_PASSWORD_LENGTH -> {
                context.getString(R.string.password_invalid)
            }
            else -> {
                null
            }
        }
    }

    private fun setupStyle() {
        setBackgroundResource(R.drawable.bg_edit_text)
        setTextColor(ContextCompat.getColor(context, R.color.black))
        setHintTextColor(ContextCompat.getColor(context, R.color.gray))
        textSize = 16f
    }
}