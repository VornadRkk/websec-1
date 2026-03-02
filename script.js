const HISTORY_LIMIT = 5;
const history = [];

function calculate() {
  try {
    const num1El = document.getElementById("num1");
    const num2El = document.getElementById("num2");
    const opEl = document.getElementById("operator");
    const resultsBox = document.getElementById("results");

    if (!num1El || !num2El || !opEl || !resultsBox) {
      throw new Error("Ошибка: не найден элемент интерфейса (num1/num2/operator/results).");
    }

    const num1 = Number(num1El.value.trim());
    const num2 = Number(num2El.value.trim());
    const operator = opEl.value;

    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
      throw new Error("Ошибка! Введите корректные числа.");
    }

    let result;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (Math.abs(num2) <= Number.EPSILON) {
          throw new Error("Ошибка: Деление на ноль!");
        }
        result = (num1 / num2).toFixed(2);
        break;
      default:
        throw new Error("Неизвестная операция.");
    }

    addResult(`${num1} ${operator} ${num2} = ${result}`, resultsBox);
  } catch (error) {
    alert(error.message);
  }
}

function addResult(text, resultsBox) {
  history.push(text);

  if (history.length > HISTORY_LIMIT) {
    history.splice(0, history.length - HISTORY_LIMIT);
  }

  resultsBox.innerHTML = "";
  history.forEach((line, idx) => {
    const div = document.createElement("div");
    div.className = "result-item";

    if (idx !== history.length - 1) {
      div.classList.add("old-result");
    }

    div.innerHTML = `<b>${line}</b>`;
    resultsBox.appendChild(div);
  });
}