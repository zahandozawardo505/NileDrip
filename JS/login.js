const loginForm = document.getElementById('loginForm');

// Demo accounts: { email, password, redirect }
const DEMO_ACCOUNTS = [
    { email: 'user@gmail.com',       password: 'user',  redirect: 'shop.html' },
    { email: 'admin@gmail.com',      password: 'admin', redirect: 'admin.html' },
    { email: 'nada-ayman@miu.com',   password: 'admin', redirect: 'admin.html' },
    { email: 'raak@gmail.com',       password: 'raak',  redirect: 'seller-dashboard.html' },
];

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
        const email = emailInput.value.trim().toLowerCase();
        const isDemo = DEMO_ACCOUNTS.some(a => a.email === email);
        if (!isDemo && !validatePassword(passwordInput.value)) {
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

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // Check demo accounts first
        const match = DEMO_ACCOUNTS.find(
            a => a.email === email && a.password === password
        );

        if (match) {
            window.location.href = match.redirect;
            return;
        }

        // Standard validation for non-demo accounts
        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailError);
        }

        if (!validatePassword(password)) {
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