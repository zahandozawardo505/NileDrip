const addProductForm = document.getElementById('addProductForm');

if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const productName = document.getElementById('productName');
        const productCategory = document.getElementById('productCategory');
        const productPrice = document.getElementById('productPrice');
        const productStock = document.getElementById('productStock');
        const productDescription = document.getElementById('productDescription');
        const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]:checked');

        // Validation
        if (productName.value.trim().length < 3) {
            showError(document.getElementById('productNameError'), 'Product name is required');
            isValid = false;
        }

        if (!productCategory.value) {
            showError(document.getElementById('productCategoryError'), 'Category is required');
            isValid = false;
        }

        if (productPrice.value <= 0) {
            showError(document.getElementById('productPriceError'), 'Price must be greater than 0');
            isValid = false;
        }

        if (productStock.value < 0) {
            showError(document.getElementById('productStockError'), 'Stock must be valid');
            isValid = false;
        }

        if (productDescription.value.trim().length < 10) {
            showError(document.getElementById('productDescriptionError'), 'Description must be at least 10 characters');
            isValid = false;
        }

        if (sizeCheckboxes.length === 0) {
            showError(document.getElementById('sizesError'), 'Select at least one size');
            isValid = false;
        }

        if (isValid) {
            alert('Product added successfully! (Demo)');
            addProductForm.reset();
        }
    });
}