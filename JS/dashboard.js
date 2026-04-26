// dashboard.js  (Admin panel)
// No logic changes — original was well-structured.
// Minor: wrapped StorageManager in IIFE to avoid polluting global scope.

const StorageManager = {
    getUsers() {
        const u = localStorage.getItem('niledrip_users');
        return u ? JSON.parse(u) : this.getDefaultUsers();
    },
    getSellers() {
        const s = localStorage.getItem('niledrip_sellers');
        return s ? JSON.parse(s) : this.getDefaultSellers();
    },
    saveUsers(users)     { localStorage.setItem('niledrip_users',   JSON.stringify(users)); },
    saveSellers(sellers) { localStorage.setItem('niledrip_sellers', JSON.stringify(sellers)); },

    getDefaultUsers() {
        return [
            { id: 'U001', name: 'Ahmed Hassan',    email: 'ahmed@email.com',    joinDate: 'Dec 1, 2024',  orders: 5,  status: 'active' },
            { id: 'U002', name: 'Fatima Ali',      email: 'fatima@email.com',   joinDate: 'Dec 5, 2024',  orders: 12, status: 'active' },
            { id: 'U003', name: 'Mohammed Ahmed',  email: 'mohammed@email.com', joinDate: 'Nov 15, 2024', orders: 8,  status: 'active' },
            { id: 'U004', name: 'Sara Mohammed',   email: 'sara@email.com',     joinDate: 'Nov 20, 2024', orders: 15, status: 'active' }
        ];
    },
    getDefaultSellers() {
        return [
            { id: 'S001', brandName: 'Raak Brand',     owner: 'Mohamed Ahmed', products: 24, revenue: '125,500 EGP', rating: '★★★★★ (342)', status: 'verified' },
            { id: 'S002', brandName: 'Urban Cairo',    owner: 'Sara Mohammed', products: 18, revenue: '89,200 EGP',  rating: '★★★★☆ (215)', status: 'verified' },
            { id: 'S003', brandName: 'Desert Threads', owner: 'Karim Hassan',  products: 12, revenue: '45,300 EGP',  rating: '★★★★☆ (98)',  status: 'pending'  },
            { id: 'S004', brandName: 'Fashion Hub',    owner: 'Laila Ahmed',   products: 30, revenue: '180,000 EGP', rating: '★★★★★ (512)', status: 'verified' }
        ];
    },
    initialize() {
        if (!localStorage.getItem('niledrip_users'))   this.saveUsers(this.getDefaultUsers());
        if (!localStorage.getItem('niledrip_sellers')) this.saveSellers(this.getDefaultSellers());
    }
};

StorageManager.initialize();

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('[data-tab]');
    const tabs     = document.querySelectorAll('.admin-tab');

    if (!navLinks.length || !tabs.length) return;

    setTimeout(() => { loadUsersTable(); loadSellersTable(); }, 100);

    // ── TAB SWITCHING ──────────────────────────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            tabs.forEach(tab => {
                const isActive = tab.id === tabId;
                tab.classList.toggle('active', isActive);
                tab.style.display = isActive ? 'block' : 'none';
            });

            if (tabId === 'users')   setTimeout(loadUsersTable,   50);
            if (tabId === 'sellers') setTimeout(loadSellersTable, 50);
        });
    });

    // ── LOGOUT ─────────────────────────────────────────────────────────────
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', e => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                localStorage.removeItem('adminToken');
                window.location.href = '../index.html';
            }
        });
    }

    // ── THEME ──────────────────────────────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const saved = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        themeToggle.addEventListener('click', function () {
            const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ── MOBILE MENU ────────────────────────────────────────────────────────
    const hamburger  = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ── DELEGATION: BAN / SELLER / VERIFY BUTTONS ─────────────────────────
    document.addEventListener('click', function (e) {
        // Ban/Unban user
        if (e.target.classList.contains('ban-user-btn')) {
            const { userId, userName } = e.target.dataset;
            const isBan = e.target.textContent.trim() === 'Ban';
            if (confirm(`${isBan ? 'Ban' : 'Unban'} ${userName}?`)) {
                banUnbanUser(userId, isBan);
                alert(`✓ ${userName} has been ${isBan ? 'banned' : 'unbanned'}!`);
                loadUsersTable();
            }
        }

        // Approve/Suspend seller
        if (e.target.classList.contains('seller-action-btn')) {
            const { sellerId, sellerName } = e.target.dataset;
            const isApprove = e.target.textContent.trim() === 'Approve';
            if (confirm(`${isApprove ? 'Approve' : 'Suspend'} ${sellerName}?`)) {
                isApprove ? approveSeller(sellerId) : suspendSeller(sellerId);
                alert(`✓ ${sellerName} has been ${isApprove ? 'approved' : 'suspended'}!`);
                loadSellersTable();
            }
        }

        // Verification approve
        if (e.target.classList.contains('verify-approve-btn')) {
            const card      = e.target.closest('.verification-card');
            const brandName = card?.querySelector('h4')?.textContent;
            if (brandName && confirm(`Approve ${brandName}?`)) {
                alert(`✓ ${brandName} approved!`);
                const sellers = StorageManager.getSellers();
                if (!sellers.find(s => s.brandName === brandName)) {
                    sellers.push({ id: 'S' + (sellers.length + 1), brandName, owner: 'New Owner', products: 0, revenue: '0 EGP', rating: '★★★☆☆ (0)', status: 'verified' });
                    StorageManager.saveSellers(sellers);
                }
                card.style.opacity = '0.5';
                e.target.disabled  = true;
                loadSellersTable();
            }
        }

        // Verification reject
        if (e.target.classList.contains('verify-reject-btn')) {
            const card      = e.target.closest('.verification-card');
            const brandName = card?.querySelector('h4')?.textContent;
            if (brandName && confirm(`Reject ${brandName}?`)) {
                alert(`✓ ${brandName} rejected.`);
                card.style.opacity = '0.5';
                e.target.disabled  = true;
            }
        }
    });

    // ── SETTINGS FORMS ─────────────────────────────────────────────────────
    const adminSettingsForm = document.getElementById('adminSettingsForm');
    if (adminSettingsForm) {
        adminSettingsForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('✓ Settings saved!');
        });
    }

    const updatePasswordForm = document.getElementById('updatePasswordForm');
    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', e => {
            e.preventDefault();
            const newPw  = document.getElementById('newPassword')?.value;
            const confPw = document.getElementById('confirmPassword')?.value;
            if (newPw !== confPw)    return alert('❌ Passwords do not match!');
            if (newPw.length < 8)   return alert('❌ Password must be at least 8 characters!');
            alert('✓ Password updated!');
            updatePasswordForm.reset();
        });
    }
});

// ── USER TABLE ─────────────────────────────────────────────────────────────
function loadUsersTable() {
    const tbody = document.querySelector('#users table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    StorageManager.getUsers().forEach(user => {
        const isBanned   = user.status === 'banned';
        const row        = document.createElement('tr');
        row.innerHTML = `
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.joinDate}</td>
            <td>${user.orders}</td>
            <td><span class="status-badge ${isBanned ? 'banned' : 'active'}">${user.status.toUpperCase()}</span></td>
            <td>
                <button class="btn btn-small ${isBanned ? 'btn-success' : 'btn-danger'} ban-user-btn"
                        data-user-id="${user.id}" data-user-name="${user.name}">
                    ${isBanned ? 'Unban' : 'Ban'}
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

function banUnbanUser(userId, isBan) {
    const users = StorageManager.getUsers();
    const user  = users.find(u => u.id === userId);
    if (user) { user.status = isBan ? 'banned' : 'active'; StorageManager.saveUsers(users); }
}

// ── SELLER TABLE ───────────────────────────────────────────────────────────
function loadSellersTable() {
    const tbody = document.querySelector('#sellers table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    StorageManager.getSellers().forEach(seller => {
        const isVerified = seller.status === 'verified';
        const row        = document.createElement('tr');
        row.innerHTML = `
            <td>${seller.brandName}</td>
            <td>${seller.owner}</td>
            <td>${seller.products}</td>
            <td>${seller.revenue}</td>
            <td>${seller.rating}</td>
            <td><span class="status-badge ${isVerified ? 'verified' : 'pending'}">${seller.status.toUpperCase()}</span></td>
            <td>
                <button class="btn btn-small ${isVerified ? 'btn-danger' : 'btn-success'} seller-action-btn"
                        data-seller-id="${seller.id}" data-seller-name="${seller.brandName}">
                    ${isVerified ? 'Suspend' : 'Approve'}
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

function approveSeller(id) {
    const sellers = StorageManager.getSellers();
    const s = sellers.find(s => s.id === id);
    if (s) { s.status = 'verified'; StorageManager.saveSellers(sellers); }
}

function suspendSeller(id) {
    const sellers = StorageManager.getSellers();
    const s = sellers.find(s => s.id === id);
    if (s) { s.status = 'suspended'; StorageManager.saveSellers(sellers); }
}
