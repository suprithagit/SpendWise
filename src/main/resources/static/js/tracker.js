document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const expenseForm = document.getElementById('expenseForm');
    const expenseIdInput = document.getElementById('expenseId');
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const descriptionInput = document.getElementById('description');
    const submitButton = document.getElementById('submitButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const expenseTableBody = document.querySelector('#expenseTable tbody');
    const totalSpentSpan = document.getElementById('totalSpent');
    const biggestCategorySpan = document.getElementById('biggestCategory');
    const categoryPieChartCanvas = document.getElementById('categoryPieChart');
    const filterPeriodSelect = document.getElementById('filterPeriod');
    const customDateRangeDiv = document.getElementById('customDateRange');
    const customEndDateDiv = document.getElementById('customEndDate');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const applyFiltersButton = document.getElementById('applyFiltersButton');
    const resetFiltersButton = document.getElementById('resetFiltersButton');
    const searchCategoryInput = document.getElementById('searchCategory');


    let categoryPieChart = null; 


    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const id = expenseIdInput.value;
        const category = categoryInput.value;
        const amount = parseFloat(amountInput.value); // Convert to number
        const date = dateInput.value;
        const description = descriptionInput.value;

        // Basic validation
        if (!category || isNaN(amount) || amount <= 0 || !date) {
            alert('Please fill in all required fields with valid data.');
            return;
        }

        const expenseData = {
            category: category,
            amount: amount,
            description: description,
            date: date
        };

        let url = '/api/expenses';
        let method = 'POST';

        if (id) { 
            url = `/api/expenses/${id}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData) 
            });

            if (!response.ok) {
                // Handle potential validation errors or other API errors
                 const errorData = await response.json();
                 const errorMessage = errorData.message || 'An error occurred while saving the expense.';
                 alert(`Error: ${errorMessage}`);
                 console.error('Error saving expense:', response.status, errorData);
                 return;
            }

            resetForm();
            loadExpenses(); 

        } catch (error) {
            console.error('Error submitting expense form:', error);
            alert('An error occurred while communicating with the server.');
        }
    });

    cancelEditButton.addEventListener('click', () => {
        resetForm();
    });

    filterPeriodSelect.addEventListener('change', (event) => {
        if (event.target.value === 'custom') {
            customDateRangeDiv.style.display = 'block';
            customEndDateDiv.style.display = 'block';
            startDateInput.setAttribute('required', 'required');
            endDateInput.setAttribute('required', 'required');
        } else {
            customDateRangeDiv.style.display = 'none';
            customEndDateDiv.style.display = 'none';
            startDateInput.removeAttribute('required');
            endDateInput.removeAttribute('required');
            startDateInput.value = '';
            endDateInput.value = '';
        }
    });

    applyFiltersButton.addEventListener('click', () => {
         loadExpenses(); 
    });

    resetFiltersButton.addEventListener('click', () => {
        filterPeriodSelect.value = 'all'; 
        searchCategoryInput.value = ''; 
        customDateRangeDiv.style.display = 'none'; 
        customEndDateDiv.style.display = 'none';
        startDateInput.value = ''; 
        endDateInput.value = '';
        startDateInput.removeAttribute('required'); 
        endDateInput.removeAttribute('required');
        loadExpenses(); 
    });

    async function loadExpenses() {
        try {
            const filterPeriod = filterPeriodSelect.value;
            const searchCategory = searchCategoryInput.value.trim();
            let url = '/api/expenses';
            let totalUrl = '/api/expenses/total';
            let summaryUrl = '/api/expenses/summary/category';
            let biggestCategoryUrl = '/api/expenses/summary/biggest-category';

            if (filterPeriod !== 'all') {
                let startDate, endDate;
                 if (filterPeriod === 'custom') {
                    startDate = startDateInput.value;
                    endDate = endDateInput.value;
                     if (!startDate || !endDate) {
                         alert('Please select both start and end dates for the custom range.');
                         return; 
                     }
                 } else {
                    // Calculate dates for 'day', 'week', 'month'
                    const today = new Date();
                    if (filterPeriod === 'day') {
                        startDate = today.toISOString().split('T')[0];
                        endDate = today.toISOString().split('T')[0];
                    } else if (filterPeriod === 'week') {
                        const dayOfWeek = today.getDay(); // 0 for Sunday, 6 for Saturday
                        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
                        startDate = new Date(today.setDate(diff)).toISOString().split('T')[0];
                        endDate = new Date(today.setDate(diff + 6)).toISOString().split('T')[0];
                    } else if (filterPeriod === 'month') {
                        startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
                        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]; // Last day of the month
                    }
                 }

                 url = `/api/expenses/date-range?startDate=${startDate}&endDate=${endDate}`;
                 totalUrl = `/api/expenses/total/date-range?startDate=${startDate}&endDate=${endDate}`;
                 summaryUrl = `/api/expenses/summary/category/date-range?startDate=${startDate}&endDate=${endDate}`;
                 biggestCategoryUrl = `/api/expenses/summary/biggest-category/date-range?startDate=${startDate}&endDate=${endDate}`;
            }

            if (searchCategory) {
                 url = `/api/expenses/search/category?q=${encodeURIComponent(searchCategory)}`;  
            }

            const expensesResponse = await fetch(url);
            if (!expensesResponse.ok) {
                 console.error('Error fetching expenses:', expensesResponse.status);
                 expenseTableBody.innerHTML = '<tr><td colspan="5">Error loading expenses.</td></tr>';
                 totalSpentSpan.textContent = 'N/A';
                 biggestCategorySpan.textContent = 'N/A';
                 updatePieChart({}); 
                 return;
            }
            const expenses = await expensesResponse.json();
            displayExpenses(expenses); 
          
            const totalResponse = await fetch(totalUrl);
             if (!totalResponse.ok) {
                 console.error('Error fetching total expenses:', totalResponse.status);
                 totalSpentSpan.textContent = 'N/A';
             } else {
                 const total = await totalResponse.json();
                 totalSpentSpan.textContent = `$${total.toFixed(2)}`; 
             }

            const summaryResponse = await fetch(summaryUrl);
             if (!summaryResponse.ok) {
                 console.error('Error fetching category summary:', summaryResponse.status);
                 updatePieChart({}); 
             } else {
                 const summary = await summaryResponse.json();
                 updatePieChart(summary); 
             }

             const biggestCategoryResponse = await fetch(biggestCategoryUrl);
             if (!biggestCategoryResponse.ok) {
                 console.error('Error fetching biggest category:', biggestCategoryResponse.status);
                 biggestCategorySpan.textContent = 'N/A';
             } else {
                 const biggest = await biggestCategoryResponse.json();
                  // The response is a Map entry, so it's an object with a single key-value pair
                 const categoryName = Object.keys(biggest)[0];
                 const categoryAmount = biggest[categoryName];
                 biggestCategorySpan.textContent = `${categoryName} ($${categoryAmount.toFixed(2)})`;
             }


        } catch (error) {
            console.error('Error loading data:', error);
             expenseTableBody.innerHTML = '<tr><td colspan="5">An error occurred while loading data.</td></tr>';
             totalSpentSpan.textContent = 'Error';
             biggestCategorySpan.textContent = 'Error';
             updatePieChart({}); 
        }
    }

    function displayExpenses(expenses) {
        expenseTableBody.innerHTML = ''; 

        if (expenses.length === 0) {
            expenseTableBody.innerHTML = '<tr><td colspan="5">No expenses found.</td></tr>';
            return;
        }

        expenses.forEach(expense => {
            const row = expenseTableBody.insertRow();

            // Format date to a more readable format (e.g., YYYY-MM-DD)
            const formattedDate = new Date(expense.date).toISOString().split('T')[0];

            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${escapeHTML(expense.category)}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${escapeHTML(expense.description || '')}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            row.querySelector('.edit-btn').addEventListener('click', () => editExpense(expense.id));
            row.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(expense.id));
        });
    }

    async function editExpense(id) {
        try {
            const response = await fetch(`/api/expenses/${id}`);
             if (!response.ok) {
                 console.error('Error fetching expense for edit:', response.status);
                 alert('Could not retrieve expense details for editing.');
                 return;
             }
            const expense = await response.json();

            expenseIdInput.value = expense.id;
            categoryInput.value = expense.category;
            amountInput.value = expense.amount;
            dateInput.value = expense.date; 
            descriptionInput.value = expense.description || '';

            submitButton.textContent = 'Update Expense';
            cancelEditButton.style.display = 'inline-block';

        } catch (error) {
            console.error('Error fetching expense for edit:', error);
            alert('An error occurred while fetching expense details.');
        }
    }
	
    async function deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            try {
                const response = await fetch(`/api/expenses/${id}`, {
                    method: 'DELETE'
                });

                 if (!response.ok) {
                     console.error('Error deleting expense:', response.status);
                     alert('An error occurred while deleting the expense.');
                     return;
                 }

                loadExpenses();

            } catch (error) {
                console.error('Error deleting expense:', error);
                alert('An error occurred while communicating with the server.');
            }
        }
    }

    function resetForm() {
        expenseForm.reset(); 
        expenseIdInput.value = ''; 
        submitButton.textContent = 'Add Expense'; 
        cancelEditButton.style.display = 'none'; 
    }

    function updatePieChart(summaryData) {
        if (categoryPieChart) {
            categoryPieChart.destroy();
        }

        const categories = Object.keys(summaryData);
        const amounts = Object.values(summaryData);

        const backgroundColors = categories.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);
        const borderColors = backgroundColors.map(color => color.replace('70%', '50%').replace('60%', '50%')); // Slightly darker border

        categoryPieChart = new Chart(categoryPieChartCanvas, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    data: amounts,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Expense Breakdown by Category'
                    },
                     tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += '$' + context.parsed.toFixed(2);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    loadExpenses(); 
});
