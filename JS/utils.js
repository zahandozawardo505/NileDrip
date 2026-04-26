// utils.js
const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = pass =>
    pass.length >= 8;

const getPasswordStrength = pass => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) s++;
    if (/\d/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    return s;
};

const showError = (el, msg) => {
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
};

const clearError = el => {
    if (!el) return;
    el.textContent = '';
    el.classList.remove('show');
};
