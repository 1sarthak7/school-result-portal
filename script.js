/* ==========================================================================
   Student Result Access Portal - Script
   Government High School
   ========================================================================== */

(function () {
    "use strict";

    // --- DOM References ---
    var form = document.getElementById("resultForm");
    var classSelect = document.getElementById("studentClass");
    var divisionSelect = document.getElementById("division");
    var rollInput = document.getElementById("rollNumber");
    var dobInput = document.getElementById("dob");
    var submitBtn = document.getElementById("submitBtn");
    var loadingIndicator = document.getElementById("loadingIndicator");

    var classError = document.getElementById("classError");
    var divisionError = document.getElementById("divisionError");
    var rollError = document.getElementById("rollError");
    var dobError = document.getElementById("dobError");

    // --- Validation Helpers ---

    /**
     * Show an error message for a given field.
     * @param {HTMLElement} field - The input or select element.
     * @param {HTMLElement} errorEl - The span element for error text.
     * @param {string} message - Error message to display.
     */
    function showError(field, errorEl, message) {
        field.closest(".form-group").classList.add("has-error");
        errorEl.textContent = message;
    }

    /**
     * Clear the error message for a given field.
     * @param {HTMLElement} field - The input or select element.
     * @param {HTMLElement} errorEl - The span element for error text.
     */
    function clearError(field, errorEl) {
        field.closest(".form-group").classList.remove("has-error");
        errorEl.textContent = "";
    }

    /**
     * Validate all form fields.
     * @returns {boolean} True if all fields are valid.
     */
    function validateForm() {
        var isValid = true;

        // Validate Class
        if (!classSelect.value) {
            showError(classSelect, classError, "Please select a class.");
            isValid = false;
        } else {
            clearError(classSelect, classError);
        }

        // Validate Division
        if (!divisionSelect.value) {
            showError(divisionSelect, divisionError, "Please select a division.");
            isValid = false;
        } else {
            clearError(divisionSelect, divisionError);
        }

        // Validate Roll Number
        var rollValue = rollInput.value.trim();
        if (!rollValue) {
            showError(rollInput, rollError, "Please enter a roll number.");
            isValid = false;
        } else if (isNaN(rollValue) || parseInt(rollValue, 10) < 1 || parseInt(rollValue, 10) > 100) {
            showError(rollInput, rollError, "Roll number must be between 1 and 100.");
            isValid = false;
        } else {
            clearError(rollInput, rollError);
        }

        // Validate Date of Birth
        if (!dobInput.value) {
            showError(dobInput, dobError, "Please select your date of birth.");
            isValid = false;
        } else {
            clearError(dobInput, dobError);
        }

        return isValid;
    }

    // --- Clear inline errors on input change ---

    classSelect.addEventListener("change", function () {
        clearError(classSelect, classError);
    });

    divisionSelect.addEventListener("change", function () {
        clearError(divisionSelect, divisionError);
    });

    rollInput.addEventListener("input", function () {
        clearError(rollInput, rollError);
    });

    dobInput.addEventListener("change", function () {
        clearError(dobInput, dobError);
    });

    // --- Form Submission ---

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Run validation
        if (!validateForm()) {
            return;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Please wait...";
        loadingIndicator.hidden = false;

        // Simulate a network request delay, then redirect
        setTimeout(function () {
            // Build query params for the result page
            var params = new URLSearchParams({
                class: classSelect.value,
                division: divisionSelect.value,
                roll: rollInput.value.trim(),
                dob: dobInput.value
            });

            window.location.href = "grade.html?" + params.toString();
        }, 1500);
    });
})();
