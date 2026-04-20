document.querySelectorAll('.sidebar-link, .admin-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const tabName = link.getAttribute('data-tab');

        // Remove active class from all links
        document.querySelectorAll('.sidebar-link, .admin-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');

        // Hide all tabs
        document.querySelectorAll('.dashboard-tab, .admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    });
});


// LOGOUT


const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '../index.html';
        }
    });
}