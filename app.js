document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------ silme islemini yapiyorum ------------------------ */


  /* ------------------------ gelir inputunu yapiyoruz ------------------------ */

  const incomeInput = document.getElementById("income");
  const ekleBtn = document.getElementById("ekle-btn");
  const incomeTotalElement = document.getElementById("income-total");

  function updatedIncomeTotal() {
    const currentIncomeTotal = parseFloat(incomeTotalElement.textContent) || 0;
    const newIncome = parseFloat(incomeInput.value) || 0;
    const updatedIncomeTotal = currentIncomeTotal + newIncome;
    incomeTotalElement.textContent = updatedIncomeTotal.toFixed(2);
    updateBalance();
  }

  ekleBtn.addEventListener("click", function () {
    // if (parseFloat(incomeInput.value) <= 0) {
    //     alert("Please enter a valid income amount.");
    //     return;
    //   }

    updatedIncomeTotal();
    incomeInput.value = "";
  });

  /* --------------------------- gideri cagiriyorum --------------------------- */

  const expenseEl = document.getElementById("expense-total");

  /* --------------------------- kalani cagiriyorum --------------------------- */

  const balanceEl = document.getElementById("balance");

  /* --------------------------- kalani hesapliyorum -------------------------- */

  function updateBalance() {
    balanceEl.textContent = parseFloat(
      incomeTotalElement.textContent - expenseEl.textContent
    ).toFixed(2);
  }

  const eraserEl = document.getElementById("eraser");
  eraserEl.addEventListener("click", function () {

      balanceEl.textContent = "0";
    expenseEl.textContent = "0";
    incomeTotalElement.textContent = "0";
    const expenseTable = document.getElementById("expense-table");
    
    const rowsToRemove = Array.from(expenseTable.querySelectorAll("tr")).slice(1);
    rowsToRemove.remove()
    rowsToRemove.forEach(row => row.remove());
  });


  /* ------------------------- harcama formu duzenleme ------------------------ */

  const kaydetButton = document.getElementById("kaydetbtn");

  kaydetButton.addEventListener("click", function () {
    /* ---------------------------- 3 inputu tanittim --------------------------- */

    const dateValue = document.getElementById("date").value;
    const quantityValue = document.getElementById("quantity").value;
    const spendTypeValue = document.getElementById("spendtype").value;

    /* if (!dateValue || !quantityValue || !spendTypeValue) {
        alert("Please fill in all the fields.");
        return;
      } */

    /* --------------------------- table 1 i tanittim --------------------------- */

    const expenseTable = document.getElementById("expense-table");

    /* -------------- kaydetten sonra rowlari ve celleri yapiyorum -------------- */

    const newRow = expenseTable.insertRow();

    const dateCell = newRow.insertCell(0);
    const spendTypeCell = newRow.insertCell(1);
    const quantityCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    /* -------------------- hucrelerin icerigini belirliyorum ------------------- */

    dateCell.textContent = dateValue;
    spendTypeCell.textContent = spendTypeValue;
    quantityCell.textContent = quantityValue;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete", "btn", "btn-danger");
    deleteBtn.innerText = "Delete";
    actionCell.appendChild(deleteBtn);

    /* ----------------------------- gider hesaplama ---------------------------- */

    const currentExpenseTotal = parseFloat(expenseEl.textContent) || 0;
    const newExpense = parseFloat(quantityValue) || 0;

    const updatedExpenseTotal = currentExpenseTotal + newExpense;
    expenseEl.textContent = updatedExpenseTotal.toFixed(2);

    updateBalance();

    document.getElementById("date").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("spendtype").value = "";

    deleteBtn.addEventListener("click", function () {
      newRow.remove();
      // expenseTable.deleteRow(newRow.rowIndex)
    });
  });
});
