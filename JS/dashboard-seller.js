// =====================
// LOAD DATA
// =====================
let products = JSON.parse(localStorage.getItem('niledrip_products')) || [];

// =====================
// SAVE + REFRESH
// =====================
function saveAndRefresh() {
    try {
        localStorage.setItem('niledrip_products', JSON.stringify(products));
        renderProducts();
        updateStats();
    } catch (e) {
        console.error(e);
        alert("Storage full! Try smaller image.");
    }
}

// =====================
// ADD PRODUCT
// =====================
function addProduct(product) {
    products.push(product);
    saveAndRefresh();
}

// =====================
// RENDER PRODUCTS
// =====================
function renderProducts() {
    const list = document.querySelector(".products-list");
    if (!list) return;

    list.innerHTML = "";

    if (products.length === 0) {
        list.innerHTML = `<p style="text-align:center;">No products yet</p>`;
        return;
    }

    products.forEach(p => {
        const item = document.createElement("div");
        item.className = "product-item";

        item.innerHTML = `
            <div class="product-image">
                <img src="${p.image}" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div class="product-details-list">
                <h4>${p.name}</h4>
                <p>${p.category} • Stock: ${p.stock}</p>
                <p><strong>${p.price} EGP</strong></p>
            </div>

            <div class="product-actions">
                <button onclick="openEditModal('${p.id}')">Edit</button>
                <button onclick="deleteProduct('${p.id}')">Delete</button>
            </div>
        `;

        list.appendChild(item);
    });
}

// =====================
// DELETE PRODUCT
// =====================
window.deleteProduct = function (id) {
    if (!confirm("Delete product?")) return;

    products = products.filter(p => p.id !== id);
    saveAndRefresh();
};

// =====================
// STATS
// =====================
function updateStats() {
    const stats = document.querySelectorAll(".stat-number");
    if (stats.length > 0) {
        stats[0].innerText = products.length;
    }
}

// =====================
// SWITCH TAB
// =====================
function switchTab(tabId) {
    document.querySelectorAll(".dashboard-tab").forEach(tab => {
        tab.style.display = tab.id === tabId ? "block" : "none";
    });

    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.classList.toggle("active", link.dataset.tab === tabId);
    });
}

// =====================
// CLOSE MODAL
// =====================
function closeEditModal() {
    const modal = document.getElementById("editProductModal");
    if (modal) modal.style.display = "none";
}

// =====================
// OPEN EDIT MODAL
// =====================
window.openEditModal = function (id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById("editProductId").value = product.id;
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductPrice").value = product.price;
    document.getElementById("editProductStock").value = product.stock;
    document.getElementById("editProductCategory").value = product.category;

    document.getElementById("editProductModal").style.display = "block";
};

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateStats();

    // Sidebar tabs
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            switchTab(link.dataset.tab);
        });
    });

    // Edit form
    const editForm = document.getElementById("editProductForm");

    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const id = document.getElementById("editProductId").value;
            const product = products.find(p => p.id === id);

            if (!product) return;

            product.name = document.getElementById("editProductName").value;
            product.price = document.getElementById("editProductPrice").value;
            product.stock = document.getElementById("editProductStock").value;
            product.category = document.getElementById("editProductCategory").value;

            saveAndRefresh();
            closeEditModal();
        });
    }

    // CANCEL BUTTON FIX
    const cancelBtn = document.getElementById("closeEditModal");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", closeEditModal);
    }
    
});