// // Select elements
let expenseForm = document.getElementById('expenseForm');
let expenseName = document.getElementById('expenseName');
let expenseAmount = document.getElementById('expenseAmount');
let expenseCategory = document.getElementById('expenseCategory');
let expenseDate = document.getElementById('expenseDate');
let expenseTable = document.getElementById('expenseTable');
let totalAmount = document.getElementById('totalAmount');
let categoryFilter = document.getElementById('categoryFilter');

// Ensure expenses array is initialized and loaded
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
updateExpenseTable(expenses);
updateTotal(expenses);

expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let name = expenseName.value;
  let amount = expenseAmount.value;
  let category = expenseCategory.value;
  let date = expenseDate.value;
  // Create expense object
  let expense = { name, amount, category, date };
  // Add to expenses array
  expenses.push(expense);
  // Save to localStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));
  // Update UI
  updateExpenseTable(expenses);
  updateTotal(expenses);
  // Reset form
  expenseForm.reset();
});

function updateExpenseTable(expensesToShow) {
  let tbody = expenseTable.querySelector('tbody');
  if (!tbody) { // If tbody doesn't exist, create it
    tbody = document.createElement('tbody');
    expenseTable.appendChild(tbody);
  }
  tbody.innerHTML = '';
  expensesToShow.forEach((expense, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td><button class="delete-btn" data-id="${index}">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
  // Add delete button event listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteExpense(parseInt(this.getAttribute('data-id')));
    });
  });
}

function updateTotal(expensesToShow) {
  let total = expensesToShow.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  totalAmount.textContent = '$' + total.toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateExpenseTable(expenses);
  updateTotal(expenses);
}

categoryFilter.addEventListener('change', function() {
  let category = this.value;
  let filtered = category === 'all' ? expenses : expenses.filter(e => e.category === category);
  updateExpenseTable(filtered);
  updateTotal(filtered);
});
