// Credentials
const VALID_USERNAME = 'Boter';
const VALID_PASSWORD = 'Boter080900';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const generalError = document.getElementById('generalError');

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
usernameInput.addEventListener('focus', () => clearError('username'));
passwordInput.addEventListener('focus', () => clearError('password'));

// Check if user is already logged in
window.addEventListener('load', () => {
    if (isUserLoggedIn()) {
        redirectToDashboard();
    }
});

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Validation
    if (!username) {
        showError('username', 'Username tidak boleh kosong');
        return;
    }
    
    if (!password) {
        showError('password', 'Password tidak boleh kosong');
        return;
    }
    
    // Authenticate
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Login successful
        const loginTime = new Date().toISOString();
        
        // Save session data
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('loginTime', loginTime);
        
        // Remember me functionality
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('lastUsername', username);
        }
        
        // Show success message
        showSuccessLogin();
        
        // Redirect after 1.5 seconds
        setTimeout(() => {
            redirectToDashboard();
        }, 1500);
    } else {
        // Login failed
        if (username !== VALID_USERNAME) {
            showError('username', 'Username tidak sesuai');
        }
        if (password !== VALID_PASSWORD) {
            showError('password', 'Password tidak sesuai');
        }
        showGeneralError('Username atau password salah. Silakan coba lagi!');
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const isPasswordVisible = passwordInput.type === 'password';
    
    if (isPasswordVisible) {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    }
}

// Show Error Message
function showError(field, message) {
    const errorElement = document.getElementById(field + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Add error styling to input
    const inputElement = field === 'username' ? usernameInput : passwordInput;
    inputElement.style.borderColor = '#ef4444';
    inputElement.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
}

// Clear Error Message
function clearError(field) {
    const errorElement = document.getElementById(field + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // Remove error styling from input
    const inputElement = field === 'username' ? usernameInput : passwordInput;
    inputElement.style.borderColor = '#e0e0e0';
    inputElement.style.backgroundColor = '#f8f9fa';
}

// Clear All Errors
function clearAllErrors() {
    clearError('username');
    clearError('password');
    generalError.classList.remove('show');
    generalError.textContent = '';
}

// Show General Error
function showGeneralError(message) {
    generalError.textContent = message;
    generalError.classList.add('show');
}

// Show Success Message
function showSuccessLogin() {
    generalError.classList.remove('show');
    generalError.style.color = '#22c55e';
    generalError.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
    generalError.textContent = '✅ Login berhasil! Mengalihkan...';
    generalError.classList.add('show');
}

// Check if User is Logged In
function isUserLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Redirect to Dashboard
function redirectToDashboard() {
    window.location.href = 'index.html';
}

// Fill username from localStorage if "Remember Me" was checked
window.addEventListener('load', () => {
    if (localStorage.getItem('rememberMe') === 'true') {
        const lastUsername = localStorage.getItem('lastUsername');
        if (lastUsername) {
            usernameInput.value = lastUsername;
            rememberMeCheckbox.checked = true;
            passwordInput.focus();
        }
    }
});

// Allow Enter key to submit
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        passwordInput.focus();
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});
