// signup.js
// FIX: Original code referenced bare variables `signupEmail`, `signupPassword`,
// `confirmPassword` which are undefined — they must be fetched via getElementById.

const signupForm = document.getElementById('signupForm');

if (signupForm) {
    const signupEmailEl    = document.getElementById('signupEmail');
    const signupPasswordEl = document.getElementById('signupPassword');
    const confirmPassEl    = document.getElementById('confirmPassword');
    const emailError       = document.getElementById('signupEmailError');
    const passwordError    = document.getElementById('signupPasswordError');
    const confirmError     = document.getElementById('confirmPasswordError');
    const strengthBar      = document.getElementById('strengthBar');
    const strengthText     = document.getElementById('strengthText');
    const toggleBtn        = document.getElementById('toggleSignupPassword');

    // Password visibility toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = signupPasswordEl.type === 'password' ? 'text' : 'password';
            signupPasswordEl.type = type;
            toggleBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Password strength indicator
    if (signupPasswordEl && strengthBar && strengthText) {
        signupPasswordEl.addEventListener('input', () => {
            const s = getPasswordStrength(signupPasswordEl.value);
            const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
            const colors = ['', '#e74c3c', '#f39c12', '#3498db', '#2ecc71'];
            strengthBar.style.width = (s * 25) + '%';
            strengthBar.style.background = colors[s] || '#ccc';
            strengthText.textContent = labels[s] || '';
        });
    }

    signupForm.addEventListener('submit', e => {
        e.preventDefault();

        let valid = true;

        if (!validateEmail(signupEmailEl.value)) {
            showError(emailError, 'Please enter a valid email address');
            valid = false;
        } else {
            clearError(emailError);
        }

        if (!validatePassword(signupPasswordEl.value)) {
            showError(passwordError, 'Password must be at least 8 characters');
            valid = false;
        } else {
            clearError(passwordError);
        }

        if (signupPasswordEl.value !== confirmPassEl.value) {
            showError(confirmError, "Passwords don't match");
            valid = false;
        } else {
            clearError(confirmError);
        }

        if (!valid) return;

        const users = Store.get('niledrip_users', []);
        users.push({ id: Date.now(), email: signupEmailEl.value });
        Store.set('niledrip_users', users);

        alert('Account created! Redirecting to login…');
        window.location.href = 'login.html';
    });
}
