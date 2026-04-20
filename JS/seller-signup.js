const sellerForm = document.getElementById('sellerForm');
if (sellerForm) {
    let currentStep = 1;
    const totalSteps = 3;
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');

    const showStep = (step) => {
        
        document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.step-dot').forEach(el => el.classList.remove('active'));

        
        document.getElementById(`step${step}`).classList.add('active');
        document.querySelector(`[data-step="${step}"]`).classList.add('active');

        
        prevBtn.style.display = step === 1 ? 'none' : 'block';
        nextBtn.style.display = step === totalSteps ? 'none' : 'block';
        submitBtn.style.display = step === totalSteps ? 'block' : 'none';
    };

    const validateStep = (step) => {
        let isValid = true;

        if (step === 1) {
            const brandName = document.getElementById('brandName');
            const brandDescription = document.getElementById('brandDescription');
            const brandCategory = document.getElementById('brandCategory');
            const ownerName = document.getElementById('ownerName');
            const ownerPhone = document.getElementById('ownerPhone');

            if (brandName.value.trim().length < 2) {
                showError(document.getElementById('brandNameError'), 'Brand name is required');
                isValid = false;
            } else {
                clearError(document.getElementById('brandNameError'));
            }

            if (brandDescription.value.trim().length < 10) {
                showError(document.getElementById('brandDescriptionError'), 'Description must be at least 10 characters');
                isValid = false;
            } else {
                clearError(document.getElementById('brandDescriptionError'));
            }

            if (!brandCategory.value) {
                showError(document.getElementById('brandCategoryError'), 'Please select a category');
                isValid = false;
            } else {
                clearError(document.getElementById('brandCategoryError'));
            }

            if (ownerName.value.trim().length < 2) {
                showError(document.getElementById('ownerNameError'), 'Owner name is required');
                isValid = false;
            } else {
                clearError(document.getElementById('ownerNameError'));
            }

            if (!ownerPhone.value.trim()) {
                showError(document.getElementById('ownerPhoneError'), 'Phone number is required');
                isValid = false;
            } else {
                clearError(document.getElementById('ownerPhoneError'));
            }
        }

        if (step === 2) {
            const email = document.getElementById('sellerEmail');
            const bankAccount = document.getElementById('bankAccount');

            if (!validateEmail(email.value)) {
                showError(document.getElementById('sellerEmailError'), 'Valid email is required');
                isValid = false;
            } else {
                clearError(document.getElementById('sellerEmailError'));
            }

            if (bankAccount.value.trim().length < 5) {
                showError(document.getElementById('bankAccountError'), 'Valid bank account is required');
                isValid = false;
            } else {
                clearError(document.getElementById('bankAccountError'));
            }
        }

        if (step === 3) {
            const termsCheck = document.getElementById('termsCheck');
            const authenticityCheck = document.getElementById('authenticityCheck');

            if (!termsCheck.checked) {
                showError(document.getElementById('termsCheckError'), 'You must accept terms');
                isValid = false;
            } else {
                clearError(document.getElementById('termsCheckError'));
            }

            if (!authenticityCheck.checked) {
                showError(document.getElementById('authenticityCheckError'), 'You must confirm authenticity');
                isValid = false;
            } else {
                clearError(document.getElementById('authenticityCheckError'));
            }
        }

        return isValid;
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    }

    sellerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            alert('Seller application submitted! (Demo)');
            sellerForm.reset();
            currentStep = 1;
            showStep(1);
        }
    });

    showStep(1);
}