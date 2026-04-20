document.addEventListener("DOMContentLoaded", () => {

    const addProductForm = document.getElementById('addProductForm');

    if (!addProductForm) return;

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        const productName = document.getElementById('productName');
        const productCategory = document.getElementById('productCategory');
        const productPrice = document.getElementById('productPrice');
        const productStock = document.getElementById('productStock');
        const productDescription = document.getElementById('productDescription');
        const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]:checked');

        // =====================
        // VALIDATION
        // =====================
        if (productName.value.trim().length < 3) {
            alert('Product name must be at least 3 characters');
            isValid = false;
        }

        if (!productCategory.value) {
            alert('Category is required');
            isValid = false;
        }

        if (productPrice.value <= 0) {
            alert('Price must be greater than 0');
            isValid = false;
        }

        if (productStock.value < 0) {
            alert('Stock must be valid');
            isValid = false;
        }

        if (productDescription.value.trim().length < 10) {
            alert('Description must be at least 10 characters');
            isValid = false;
        }

        if (sizeCheckboxes.length === 0) {
            alert('Select at least one size');
            isValid = false;
        }

        if (!isValid) return;

        // =====================
        // CREATE PRODUCT
        // =====================
        const newProduct = {
            id: "ID" + Date.now(),
            name: productName.value.trim(),
            category: productCategory.value,
            price: productPrice.value,
            stock: productStock.value,
            description: productDescription.value,
            sizes: Array.from(sizeCheckboxes).map(s => s.value),
            image: "https://via.placeholder.com/150"
        };

        // =====================
        // CALL MAIN FUNCTION
        // =====================
        addProduct(newProduct);

        alert("Product added successfully!");

        addProductForm.reset();
    });
});