document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------- call whole elements form DOM ---------------------- */

  const formEl = document.getElementById("form");
  const table1Body = document.getElementById("table1-body");
  const incomeInput = document.getElementById("income-input");
  const addBtn = document.getElementById("add-btn");
  const incomeTotal = document.getElementById("income-total");
  const expenseTotal = document.getElementById("expense-total");
  const balance = document.getElementById("balance");
  const eraserEl = document.getElementById("eraser");

  /* -------------------------------------------------------------------------- */
  /*                       1.1 Write save button function                       */
  /* -------------------------------------------------------------------------- */

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    // 1.call the elements from the form

    const dateEl = document.getElementById("date-el");
    const expenseEl = document.getElementById("expense-el");
    const expenseTypeEl = document.getElementById("expenseType-el");

    // Validate input values
    const expenseValue = parseFloat(expenseEl.value);
    if (isNaN(expenseValue)) {
      // Handle invalid input (e.g., show an error message)
      alert("Invalid expense value");
      return;
    }

    // 2.Create a new row
    const newRow = document.createElement("tr"); //row

    // 3.Create cells and add values
    const dateCell = document.createElement("td"); // date
    dateCell.textContent = dateEl.value;
    newRow.appendChild(dateCell);

    const expenseTypeCell = document.createElement("td"); // expense type
    expenseTypeCell.textContent = expenseTypeEl.value;
    newRow.appendChild(expenseTypeCell);

    const amountCell = document.createElement("td"); // expense
    amountCell.textContent = expenseEl.value;
    newRow.appendChild(amountCell);

    const actionCell = document.createElement("td"); //action
    const icon = document.createElement("i");
    icon.className = "bi bi-trash";
    actionCell.appendChild(icon);
    newRow.appendChild(actionCell);

    // 4. Add row to the table body

    table1Body.appendChild(newRow);

    /* -------------------------------------------------------------------------- */
    /*                1.2 Update expense total inside the save function               */
    /* -------------------------------------------------------------------------- */

    const currentExpenseTotal = parseFloat(expenseTotal.textContent) || 0;
    const newExpenseTotal = currentExpenseTotal + parseFloat(expenseEl.value);
    expenseTotal.textContent = parseFloat(newExpenseTotal).toFixed(2);
    updateBalance();

    /* -------------------------------------------------------------------------- */
    /*             1.3 Write delete function inside the save function             */
    /* -------------------------------------------------------------------------- */

    actionCell.addEventListener("click", function () {
      newRow.remove();
    });

    // Clear form inputs

    formEl.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                              2.Uptade Income                              */
  /* -------------------------------------------------------------------------- */
  const currentIncomeTotal = parseFloat(incomeTotal.textContent) || 0;
  const newIncomeTotal = currentIncomeTotal + parseFloat(incomeInput.value);
  incomeTotal.textContent = newIncomeTotal;

  // *************************************************************************** //

  /* -------------------------------------------------------------------------- */
  /*                        3. Write Add button function                        */
  /* -------------------------------------------------------------------------- */

  addBtn.addEventListener("click", function () {
    const newIncome = parseFloat(incomeInput.value);
    if (isNaN(newIncome)) {
     alert("Invalid income value");
      return;
    }

    const currentIncomeTotal = parseFloat(incomeTotal.textContent) || 0;
    const updatedIncomeTotal = (currentIncomeTotal + newIncome).toFixed(2);
    incomeTotal.textContent = updatedIncomeTotal;
    incomeInput.value = "";
    updateBalance();
  });

  /* -------------------------------------------------------------------------- */
  /*                 4. Update balance             
    /* -------------------------------------------------------------------------- */
  function updateBalance() {
    const currentIncomeTotal = parseFloat(incomeTotal.textContent) || 0;
    const currentExpenseTotal = parseFloat(expenseTotal.textContent) || 0;
    const newBalance = currentIncomeTotal - currentExpenseTotal;
    balance.textContent = newBalance.toFixed(2);
  }

  /* -------------------------------------------------------------------------- */
  /*                         5.Write clear all function                         */
  /* -------------------------------------------------------------------------- */
  eraserEl.addEventListener("click", function () {
    table1Body.textContent = "";
    balance.textContent = "0";
    incomeTotal.textContent = "0";
    expenseTotal.textContent = "0";
  });
});
