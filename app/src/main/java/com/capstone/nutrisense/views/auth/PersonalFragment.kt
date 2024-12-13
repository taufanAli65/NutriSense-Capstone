package com.capstone.nutrisense.views.auth

import android.app.DatePickerDialog
import android.icu.util.Calendar
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.capstone.nutrisense.R
import com.capstone.nutrisense.databinding.FragmentPersonalBinding

class PersonalFragment : Fragment() {

    private var _binding: FragmentPersonalBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_personal, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentPersonalBinding.bind(view)

        val completeButton: Button = view.findViewById(R.id.complete_button)
        completeButton.setOnClickListener {
            findNavController().navigate(R.id.action_personalFragment_to_dashboardFragment)
        }

        binding.weightPicker.apply {
            minValue = 30
            maxValue = 200
            value = 65
            wrapSelectorWheel = true
    }
        binding.heightPicker.apply {
            minValue = 100
            maxValue = 250
            value = 160
            wrapSelectorWheel = true
        }
        binding.birthdayPicker.setOnClickListener {
            showDatePicker()
        }
    }

    private fun showDatePicker() {
        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        val datePickerDialog = DatePickerDialog(requireContext(),
            { _, selectedYear, selectedMonth, selectedDay ->
                val selectedDate = "$selectedDay/${selectedMonth + 1}/$selectedYear"
                binding.birthdayPicker.setText(selectedDate)
            }, year, month, day
        )
        datePickerDialog.show()
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}