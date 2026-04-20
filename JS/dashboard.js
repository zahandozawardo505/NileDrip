// ===== STORAGE MANAGEMENT FOR ADMIN DASHBOARD =====
const StorageManager = {
    getUsers() {
        const users = localStorage.getItem('niledrip_users');
        return users ? JSON.parse(users) : this.getDefaultUsers();
    },

    getSellers() {
        const sellers = localStorage.getItem('niledrip_sellers');
        return sellers ? JSON.parse(sellers) : this.getDefaultSellers();
    },

    saveUsers(users) {
        localStorage.setItem('niledrip_users', JSON.stringify(users));
    },

    saveSellers(sellers) {
        localStorage.setItem('niledrip_sellers', JSON.stringify(sellers));
    },

    getDefaultUsers() {
        return [
            { id: 'U001', name: 'Ahmed Hassan', email: 'ahmed@email.com', joinDate: 'Dec 1, 2024', orders: 5, status: 'active' },
            { id: 'U002', name: 'Fatima Ali', email: 'fatima@email.com', joinDate: 'Dec 5, 2024', orders: 12, status: 'active' },
            { id: 'U003', name: 'Mohammed Ahmed', email: 'mohammed@email.com', joinDate: 'Nov 15, 2024', orders: 8, status: 'active' },
            { id: 'U004', name: 'Sara Mohammed', email: 'sara@email.com', joinDate: 'Nov 20, 2024', orders: 15, status: 'active' }
        ];
    },

    getDefaultSellers() {
        return [
            { id: 'S001', brandName: 'Raak Brand', owner: 'Mohamed Ahmed', products: 24, revenue: '125,500 EGP', rating: '★★★★★ (342)', status: 'verified' },
            { id: 'S002', brandName: 'Urban Cairo', owner: 'Sara Mohammed', products: 18, revenue: '89,200 EGP', rating: '★★★★☆ (215)', status: 'verified' },
            { id: 'S003', brandName: 'Desert Threads', owner: 'Karim Hassan', products: 12, revenue: '45,300 EGP', rating: '★★★★☆ (98)', status: 'pending' },
            { id: 'S004', brandName: 'Fashion Hub', owner: 'Laila Ahmed', products: 30, revenue: '180,000 EGP', rating: '★★★★★ (512)', status: 'verified' }
        ];
    },

    initialize() {
        if (!localStorage.getItem('niledrip_users')) this.saveUsers(this.getDefaultUsers());
        if (!localStorage.getItem('niledrip_sellers')) this.saveSellers(this.getDefaultSellers());
    }
};

StorageManager.initialize();

// === MAIN INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Dashboard script loaded');
    
    const navLinks = document.querySelectorAll('[data-tab]');
    const tabs = document.querySelectorAll('[class*="tab"]');
    
    console.log('Found nav links:', navLinks.length);
    console.log('Found tabs:', tabs.length);
    
    if (navLinks.length === 0 || tabs.length === 0) return;

    // Load tables on page load
    setTimeout(() => {
        loadUsersTable();
        loadSellersTable();
    }, 100);

    // --- 1. TAB SWITCHING ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            tabs.forEach(tab => {
                tab.classList.remove('active');
                tab.style.display = 'none';
            });
            
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
                selectedTab.style.display = 'block';
                
                if (tabId === 'users') setTimeout(() => loadUsersTable(), 50);
                else if (tabId === 'sellers') setTimeout(() => loadSellersTable(), 50);
            }
        });
    });

    // --- 2. LOGOUT ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                localStorage.removeItem('adminToken');
                window.location.href = '../index.html';
            }
        });
    }

    // --- 3. THEME TOGGLE ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.style.transform = 'rotate(180deg)';
            setTimeout(() => this.style.transform = 'rotate(0deg)', 300);
        });
    }

    // --- 4. MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- 5. USER BAN/UNBAN BUTTONS ---
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('ban-user-btn')) {
            const userId = e.target.getAttribute('data-user-id');
            const userName = e.target.getAttribute('data-user-name');
            const action = e.target.textContent.trim();
            const isBan = action === 'Ban';
            
            if (confirm(`Are you sure you want to ${isBan ? 'ban' : 'unban'} ${userName}?`)) {
                banUnbanUser(userId, userName, isBan);
                alert(`✓ ${userName} has been ${isBan ? 'banned' : 'unbanned'}!`);
                loadUsersTable();
            }
        }
        
        // --- 6. SELLER APPROVE/SUSPEND BUTTONS ---
        if (e.target.classList.contains('seller-action-btn')) {
            const sellerId = e.target.getAttribute('data-seller-id');
            const sellerName = e.target.getAttribute('data-seller-name');
            const action = e.target.textContent.trim();
            const isApprove = action === 'Approve';
            
            if (confirm(`Are you sure you want to ${isApprove ? 'approve' : 'suspend'} ${sellerName}?`)) {
                if (isApprove) {
                    approveSeller(sellerId, sellerName);
                    alert(`✓ ${sellerName} has been approved!`);
                } else {
                    suspendSeller(sellerId, sellerName);
                    alert(`✓ ${sellerName} has been suspended!`);
                }
                loadSellersTable();
            }
        }

        // --- 7. VERIFICATION APPROVE BUTTONS ---
        if (e.target.id === 'approveBtn' || e.target.closest('#approveBtn')) {
            const btn = e.target.id === 'approveBtn' ? e.target : e.target.closest('#approveBtn');
            const card = btn.closest('.verification-card');
            const brandName = card?.querySelector('h4')?.textContent;
            
            if (brandName && confirm(`Approve ${brandName}?`)) {
                alert(`✓ ${brandName} has been approved!`);
                const sellers = StorageManager.getSellers();
                if (!sellers.find(s => s.brandName === brandName)) {
                    const newSeller = {
                        id: 'S' + (sellers.length + 1),
                        brandName: brandName,
                        owner: 'New Owner',
                        products: 0,
                        revenue: '0 EGP',
                        rating: '★★★☆☆ (0)',
                        status: 'verified'
                    };
                    sellers.push(newSeller);
                    StorageManager.saveSellers(sellers);
                }
                card.style.opacity = '0.5';
                btn.disabled = true;
                loadSellersTable();
            }
        }

        // --- 8. VERIFICATION REJECT BUTTONS ---
        if (e.target.classList.contains('btn-danger') && e.target.closest('.verification-card')) {
            const card = e.target.closest('.verification-card');
            const brandName = card?.querySelector('h4')?.textContent;
            
            if (brandName && confirm(`Reject ${brandName}?`)) {
                alert(`✓ ${brandName} has been rejected!`);
                card.style.opacity = '0.5';
                e.target.disabled = true;
            }
        }
    });

    // --- 9. ADMIN SETTINGS FORM ---
    const adminSettingsForm = document.getElementById('adminSettingsForm');
    if (adminSettingsForm) {
        adminSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✓ Admin settings saved successfully!');
        });
    }

    // --- 10. PASSWORD UPDATE FORM ---
    const updatePasswordForm = document.getElementById('updatePasswordForm');
    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword')?.value;
            const confirmPassword = document.getElementById('confirmPassword')?.value;
            
            if (newPassword !== confirmPassword) {
                alert('❌ Passwords do not match!');
                return;
            }
            if (newPassword.length < 8) {
                alert('❌ Password must be at least 8 characters!');
                return;
            }
            
            alert('✓ Password updated successfully!');
            this.reset();
        });
    }

    console.log('Admin Dashboard initialized successfully');
});

// ===== USER MANAGEMENT =====
function loadUsersTable() {
    const users = StorageManager.getUsers();
    const usersTableBody = document.querySelector('#users table tbody');
    
    if (!usersTableBody) return;
    
    usersTableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        const statusClass = user.status === 'active' ? 'active' : 'banned';
        const buttonText = user.status === 'active' ? 'Ban' : 'Unban';
        const buttonClass = user.status === 'active' ? 'btn-danger' : 'btn-success';
        
        row.innerHTML = `
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.joinDate}</td>
            <td>${user.orders}</td>
            <td><span class="status-badge ${statusClass}">${user.status.toUpperCase()}</span></td>
            <td>
                <button class="btn btn-small ${buttonClass} ban-user-btn" data-user-id="${user.id}" data-user-name="${user.name}">
                    ${buttonText}
                </button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
    
    console.log('Users table loaded with', users.length, 'users');
}

function banUnbanUser(userId, userName, isBan) {
    const users = StorageManager.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = isBan ? 'banned' : 'active';
        StorageManager.saveUsers(users);
    }
}

// ===== SELLER MANAGEMENT =====
function loadSellersTable() {
    const sellers = StorageManager.getSellers();
    const sellersTableBody = document.querySelector('#sellers table tbody');
    
    if (!sellersTableBody) return;
    
    sellersTableBody.innerHTML = '';
    
    sellers.forEach(seller => {
        const row = document.createElement('tr');
        const statusClass = seller.status === 'verified' ? 'verified' : 'pending';
        const buttonText = seller.status === 'verified' ? 'Suspend' : 'Approve';
        const buttonClass = seller.status === 'verified' ? 'btn-danger' : 'btn-success';
        
        row.innerHTML = `
            <td>${seller.brandName}</td>
            <td>${seller.owner}</td>
            <td>${seller.products}</td>
            <td>${seller.revenue}</td>
            <td>${seller.rating}</td>
            <td><span class="status-badge ${statusClass}">${seller.status.toUpperCase()}</span></td>
            <td>
                <button class="btn btn-small ${buttonClass} seller-action-btn" data-seller-id="${seller.id}" data-seller-name="${seller.brandName}">
                    ${buttonText}
                </button>
            </td>
        `;
        sellersTableBody.appendChild(row);
    });
    
    console.log('Sellers table loaded with', sellers.length, 'sellers');
}

function approveSeller(sellerId, sellerName) {
    const sellers = StorageManager.getSellers();
    const seller = sellers.find(s => s.id === sellerId);
    if (seller) {
        seller.status = 'verified';
        StorageManager.saveSellers(sellers);
    }
}

function suspendSeller(sellerId, sellerName) {
    const sellers = StorageManager.getSellers();
    const seller = sellers.find(s => s.id === sellerId);
    if (seller) {
        seller.status = 'suspended';
        StorageManager.saveSellers(sellers);
    }
}

// ===== UTILITY FUNCTIONS =====
function exportTableToCSV(filename, table) {
    let csv = [];
    let rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        let rowData = [];
        let cells = row.querySelectorAll('td, th');
        cells.forEach(cell => {
            rowData.push('"' + cell.textContent.trim().replace(/"/g, '""') + '"');
        });
        csv.push(rowData.join(','));
    });
    
    downloadCSV(csv.join('\n'), filename);
}

function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], {type: 'text/csv'});
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', URL.createObjectURL(csvFile));
    downloadLink.setAttribute('download', filename);
    downloadLink.click();
}