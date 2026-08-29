// Check if user is logged in
function checkAuthentication() {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

// Data storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let chart = null;

// DOM Elements
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const addBtn = document.getElementById('addBtn');
const resetBtn = document.getElementById('resetBtn');
const logoutBtn = document.getElementById('logoutBtn');
const balanceDisplay = document.getElementById('balance');
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpenseDisplay = document.getElementById('totalExpense');
const historyList = document.getElementById('historyList');
const usernameDisplay = document.getElementById('usernameDisplay');
const ctx = document.getElementById('savingsChart').getContext('2d');

// Event Listeners
addBtn.addEventListener('click', addTransaction);
resetBtn.addEventListener('click', resetData);
if (logoutBtn) logoutBtn.addEventListener('click', logout);
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTransaction();
});

// Logout Function
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loginTime');
        window.location.href = 'login.html';
    }
}

// Display Username
function displayUsername() {
    const username = sessionStorage.getItem('username');
    if (usernameDisplay && username) {
        usernameDisplay.textContent = username;
    }
}

// Add Transaction
function addTransaction() {
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const description = descriptionInput.value || `Transaksi ${type === 'income' ? 'Menabung' : 'Penarikan'}`;

    if (!amount || amount <= 0) {
        alert('Masukkan nominal yang valid!');
        return;
    }

    const transaction = {
        id: Date.now(),
        amount: amount,
        type: type,
        description: description,
        date: new Date().toLocaleString('id-ID')
    };

    transactions.push(transaction);
    saveToLocalStorage();
    updateUI();
    clearInputs();

    // Tambah animasi
    amountInput.style.animation = 'none';
    setTimeout(() => {
        amountInput.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// Clear Inputs
function clearInputs() {
    amountInput.value = '';
    descriptionInput.value = '';
    typeSelect.value = 'income';
    amountInput.focus();
}

// Update UI
function updateUI() {
    updateSummary();
    updateHistory();
    updateChart();
}

// Update Summary
function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    balanceDisplay.textContent = formatRupiah(balance);
    totalIncomeDisplay.textContent = formatRupiah(totalIncome);
    totalExpenseDisplay.textContent = formatRupiah(totalExpense);
}

// Update History
function updateHistory() {
    if (transactions.length === 0) {
        historyList.innerHTML = '<p class="empty-message">Belum ada transaksi. Mulai tambahkan transaksi Anda!</p>';
        return;
    }

    historyList.innerHTML = transactions
        .slice()
        .reverse()
        .map(transaction => `
            <div class="history-item ${transaction.type}">
                <div class="history-item-info">
                    <div class="history-item-description">${transaction.description}</div>
                    <div class="history-item-date">${transaction.date}</div>
                </div>
                <div class="history-item-amount">
                    ${transaction.type === 'income' ? '+' : '-'} ${formatRupiah(transaction.amount)}
                </div>
            </div>
        `)
        .join('');
}

// Update Chart
function updateChart() {
    const chartData = generateChartData();

    if (chart) {
        chart.data = chartData;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 },
                            color: '#333',
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: { size: 14 },
                        bodyFont: { size: 13 },
                        callbacks: {
                            label: function(context) {
                                return 'Saldo: ' + formatRupiah(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rp ' + (value / 1000000).toFixed(1) + 'M';
                            },
                            color: '#999'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#999'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Generate Chart Data
function generateChartData() {
    let balance = 0;
    const labels = [];
    const data = [];

    transactions.forEach((transaction, index) => {
        if (transaction.type === 'income') {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }

        labels.push(`Tr ${index + 1}`);
        data.push(balance);
    });

    return {
        labels: labels,
        datasets: [
            {
                label: 'Perkembangan Saldo',
                data: data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#764ba2'
            }
        ]
    };
}

// Format Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Save to LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Reset Data
function resetData() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
        transactions = [];
        saveToLocalStorage();
        updateUI();
        alert('Data berhasil direset!');
    }
}

// Initialize on load
window.addEventListener('load', () => {
    checkAuthentication();
    displayUsername();
    updateUI();
    amountInput.focus();
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);
