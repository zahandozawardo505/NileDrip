const loginForm = document.getElementById('loginForm');

if (loginForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.getElementById('togglePassword');

    // Real-time validation
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            clearError(emailError);
        }
    });

    passwordInput.addEventListener('blur', () => {
        if (!validatePassword(passwordInput.value)) {
            showError(passwordError, 'Password must be at least 8 characters');
        } else {
            clearError(passwordError);
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
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailError);
        }

        if (!validatePassword(passwordInput.value)) {
            showError(passwordError, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        if (isValid) {
            alert('Login successful! (Demo - no backend)');
            // In real app, submit to backend
        }
    });
}