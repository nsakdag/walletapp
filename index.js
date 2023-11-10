document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------ harcam formu ------------------------------ */

  const kaydetButton = document.getElementById("kaydetbtn");

  /* -------------------------------- gelirler -------------------------------- */
  const incomeInput = document.getElementById("income");
  const incomeTotalElement = document.getElementById("income-total");
  const ekleBtn = document.getElementById("ekle-btn");

  /* -------------------------------- giderler -------------------------------- */
  const expenseEl = document.getElementById("expense-total");
  const balanceEl = document.getElementById("balance");

  /* --------------------------------- silici --------------------------------- */

  const eraserEl = document.getElementById("eraser");
  eraserEl.addEventListener("click", function () {
    balanceEl.textContent = "0";
    expenseEl.textContent = "0";
    incomeTotalElement.textContent = "0";
    const expenseTable = document.getElementById("expense-table");

    // Remove all rows except the first one (table headers)
    const rowsToRemove = Array.from(expenseTable.querySelectorAll("tr")).slice(1);
    rowsToRemove.forEach(row => row.remove());
  });

  function updateBalance() {
    const currentIncomeTotal = parseFloat(incomeTotalElement.textContent) || 0;
    const currentExpenseTotal = parseFloat(expenseEl.textContent) || 0;
    const currentBalance = currentIncomeTotal - currentExpenseTotal;
    balanceEl.textContent = currentBalance.toFixed(2);
  }

  function updateIncomeTotal() {
    const currentIncomeTotal = parseFloat(incomeTotalElement.textContent) || 0;
    const newIncome = parseFloat(incomeInput.value) || 0;
    const updatedIncomeTotal = currentIncomeTotal + newIncome;
    incomeTotalElement.textContent = updatedIncomeTotal.toFixed(2);
    updateBalance();
  }

  ekleBtn.addEventListener("click", function () {
    if (parseFloat(incomeInput.value) <= 0) {
      alert("Please enter a valid income amount.");
      return;
    }

    updateIncomeTotal();

    incomeInput.value = "";
  });

  kaydetButton.addEventListener("click", function () {
    const dateValue = document.getElementById("date").value;
    const quantityValue = document.getElementById("quantity").value;
    const spendTypeValue = document.getElementById("spendtype").value;

      if (!dateValue || !quantityValue || !spendTypeValue) {
      alert("Please fill in all the fields.");
      return;
    }
 
    const expenseTable = document.getElementById("expense-table");

    const newRow = expenseTable.insertRow();

    const dateCell = newRow.insertCell(0);
    const spendTypeCell = newRow.insertCell(1);
    const quantityCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    dateCell.textContent = dateValue;
    spendTypeCell.textContent = spendTypeValue;
    quantityCell.textContent = quantityValue;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete", "btn", "btn-danger");
    deleteBtn.innerText = "Delete";
    actionCell.appendChild(deleteBtn);
    // actionCell.innerHTML = '<button class="btn btn-danger">Delete</button>';

    deleteBtn.addEventListener('click' , function() {
      expenseTable.deleteRow(newRow.rowIndex);
    })

    const currentExpenseTotal = parseFloat(expenseEl.textContent) || 0;
    const newExpense = parseFloat(quantityValue) || 0;
    const updatedExpenseTotal = currentExpenseTotal + newExpense;
    expenseEl.textContent = updatedExpenseTotal.toFixed(2);

    updateBalance();

    document.getElementById("date").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("spendtype").value = "";
  });
});
