function calculate() {
  try {
    const a = readNumber("num1");
    const b = readNumber("num2");
    const op = document.getElementById("operator").value;

    const value = compute(a, b, op);
    const line = `${a} ${op} ${b} = ${value}`;

    pushResult(document.getElementById("results"), line, 5);
  } catch (e) {
    alert(e.message);
  }
}

function readNumber(id) {
  const raw = document.getElementById(id).value.trim();
  const n = Number(raw);

  if (!Number.isFinite(n)) {
    throw new Error("Ошибка! Введите корректные числа.");
  }
  return n;
}

function compute(x, y, op) {
  const actions = {
    "+": () => x + y,
    "-": () => x - y,
    "*": () => x * y,
    "/": () => {
      if (Math.abs(y) <= Number.EPSILON) {
        throw new Error("Ошибка: Деление на ноль!");
      }
      return (x / y).toFixed(2);
    }
  };

  const fn = actions[op];
  if (!fn) throw new Error("Неизвестная операция.");

  return fn();
}

function pushResult(box, text, limit) {
  Array.from(box.querySelectorAll(".result-item")).forEach(el =>
    el.classList.add("old-result")
  );
  const row = document.createElement("div");
  row.className = "result-item";
  row.innerHTML = `<strong>${text}</strong>`;
  box.appendChild(row);

  while (box.children.length > limit) {
    box.removeChild(box.firstElementChild);
  }
}