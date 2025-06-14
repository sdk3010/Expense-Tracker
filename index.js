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


// 1. Get HTML elements
// let expenseForm = document.getElementById('expenseForm');
// let expenseName = document.getElementById('expenseName');
// let expenseAmount = document.getElementById('expenseAmount');
// let expenseCategory = document.getElementById('expenseCategory');
// let expenseDate = document.getElementById('expenseDate');
// let expenseTable = document.getElementById('expenseTable');
// let totalAmount = document.getElementById('totalAmount');
// let categoryFilter = document.getElementById('categoryFilter');

// // 2. Load saved expenses
// let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
// updateList(expenses);
// updateTotal(expenses);

// // 3. When form is submitted
// expenseForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   let name = expenseName.value;
//   let amount = expenseAmount.value;
//   let date = expenseDate.value;
//   let expense = { name, amount, date };
//   expenses.push(expense);
//   localStorage.setItem('expenses', JSON.stringify(expenses));
//   updateList(expenses);
//   updateTotal(expenses);
//   expenseForm.reset();
// });

// // 4. Update the list of expenses
// function updateExpenseTable(expensesToShow) {
//   let tbody = expenseTable.querySelector('tbody');
//   tbody.innerHTML = '';
//   expensesToShow.forEach((expense, index) => {
//     let row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${expense.name}</td>
//       <td>${expense.amount}</td>
//       <td>${expense.category}</td>
//       <td>${expense.date}</td>
//       <td><button class="delete-btn" data-id="${index}">Delete</button></td>
//     `;
//     row.querySelector('.delete-btn').addEventListener('click', function() {
//       expenses.splice(index, 1);
//       localStorage.setItem('expenses', JSON.stringify(expenses));
//       updateExpenseTable(expenses);
//       updateTotal(expenses);
//     });
//     tbody.appendChild(row);
//   });
// }

// // 5. Update the total
// function updateTotal(expensesToShow) {
//   let total = expensesToShow.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
//   totalAmount.textContent = '$' + total.toFixed(2);
// }

// // 6. Filter by category
// categoryFilter.addEventListener('change', function() {
//   let category = this.value;
//   let filtered = category === 'all' ? expenses : expenses.filter(e => e.category === category);
//   updateExpenseTable(filtered);
//   updateTotal(filtered);
// });