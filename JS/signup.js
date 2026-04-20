const signupForm = document.getElementById('signupForm');

if (signupForm) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const togglePasswordBtn = document.getElementById('toggleSignupPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Password strength indicator
    passwordInput.addEventListener('input', () => {
        const strength = getPasswordStrength(passwordInput.value);
        const strengthPercent = (strength / 4) * 100;

        if (strengthBar) {
            strengthBar.style.width = strengthPercent + '%';

            let color = '#ff6b6b'; // weak
            let text = 'Weak';

            if (strength === 2) {
                color = '#ffc107';
                text = 'Fair';
            } else if (strength === 3) {
                color = '#4caf50';
                text = 'Good';
            } else if (strength === 4) {
                color = '#00d9ff';
                text = 'Strong';
            }

            strengthBar.parentElement.style.display = 'block';
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        }
    });

    // Password visibility toggle
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const emailError = document.getElementById('signupEmailError');
        const passwordError = document.getElementById('signupPasswordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const termsError = document.getElementById('termsError');

        // First name validation
        if (firstNameInput.value.trim().length < 2) {
            showError(firstNameError, 'First name must be at least 2 characters');
            isValid = false;
        } else {
            clearError(firstNameError);
        }

        // Last name validation
        if (lastNameInput.value.trim().length < 2) {
            showError(lastNameError, 'Last name must be at least 2 characters');
            isValid = false;
        } else {
            clearError(lastNameError);
        }

        // Email validation
        if (!validateEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailError);
        }

        // Password validation
        if (!validatePassword(passwordInput.value)) {
            showError(passwordError, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        // Confirm password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordError, 'Passwords do not match');
            isValid = false;
        } else {
            clearError(confirmPasswordError);
        }

        // Terms validation
        if (!termsCheckbox.checked) {
            showError(termsError, 'You must agree to the terms');
            isValid = false;
        } else {
            clearError(termsError);
        }

        if (isValid) {
            alert('Account created successfully! (Demo)');
            signupForm.reset();
        }
    });
}