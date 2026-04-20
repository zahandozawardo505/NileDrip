/**
 * NileDrip Admin Dashboard - Final Controller
 * Handles: Tab switching, Search, Smooth Removal, and Password Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    const adminContent = document.querySelector('.admin-content');
    const navLinks = document.querySelectorAll('.admin-link');
    const tabs = document.querySelectorAll('.admin-tab');

    // --- 1. Navigation / Tab Switching ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');

            // Update Sidebar Links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Tab Content
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === tabId) tab.classList.add('active');
            });
        });
    });

    // --- 2. Action Buttons (Ban/Approve/Reject) ---
    if (adminContent) {
        adminContent.addEventListener('click', (e) => {
            const target = e.target;

            // CASE A: Table Row Actions (Ban/Suspend)
            if (target.classList.contains('btn-danger') && target.closest('tr')) {
                const row = target.closest('tr');
                const name = row.cells[1] ? row.cells[1].innerText : "this item";

                if (confirm(`Are you sure you want to remove/ban ${name}?`)) {
                    removeWithAnimation(row);
                }
            }

            // CASE B: Verification Card Actions (Approve/Reject)
            const actionsContainer = target.closest('.verification-actions');
            if (actionsContainer) {
                const card = target.closest('.verification-card');
                const brand = card.querySelector('h4').innerText;

                if (target.innerText.includes('Approve')) {
                    alert(`${brand} has been approved!`);
                    removeWithAnimation(card);
                } else if (target.innerText.includes('Reject')) {
                    if (confirm(`Reject application for ${brand}?`)) {
                        removeWithAnimation(card);
                    }
                }
            }
        });
    }

    // --- 3. Password Update Logic ---
    const passwordForm = document.getElementById('updatePasswordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;

            if (newPass !== confirmPass) {
                alert("New passwords do not match!");
                return;
            }

            if (newPass.length < 8) {
                alert("Password must be at least 8 characters.");
                return;
            }

            alert("Password updated successfully!");
            passwordForm.reset();
        });
    }

    // --- 4. Search Functionality ---
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const activeTab = e.target.closest('.admin-tab');
            const tableBody = activeTab.querySelector('table tbody');

            if (tableBody) {
                Array.from(tableBody.rows).forEach(row => {
                    const text = row.innerText.toLowerCase();
                    row.style.display = text.includes(term) ? '' : 'none';
                });
            }
        });
    });

    // --- 5. Logout ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../index.html';
            }
        });
    }

    /**
     * Reusable Animation Helper
     */
    function removeWithAnimation(element) {
        // Trigger the CSS transition
        element.style.transition = 'all 0.4s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateX(20px)';

        // Remove from DOM after transition finishes
        setTimeout(() => {
            element.remove();
        }, 400);
    }
});