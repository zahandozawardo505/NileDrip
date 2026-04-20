// ============================================
// FORM VALIDATION UTILITIES
// ============================================

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
};

const showError = (element, message) => {
    if (element) {
        element.textContent = message;
        element.classList.add('show');
    }
};

const clearError = (element) => {
    if (element) {
        element.textContent = '';
        element.classList.remove('show');
    }
};
