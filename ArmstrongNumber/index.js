/*let a;
console.log(a);
a=5;
console.log(a);
*/

function isArmstrong(num) {
  if (!Number.isInteger(num) || num < 0) {
    return false;
  }

  const digits = String(num).length;
  let sum = 0;

  for (let n = num; n > 0; n = Math.floor(n / 10)) {
    sum += (n % 10) ** digits;   
  }

  return sum === num;
}

const numberInput = document.getElementById("number-input");
const checkButton = document.getElementById("check-button");
const result = document.getElementById("result");

function checkAndShow() {
  const value = numberInput.value.trim();
  const number = Number(value);

  result.textContent = isArmstrong(number)
    ? `${number} is an Armstrong number.`
    : `${number} is not an Armstrong number.`;
}

checkButton.addEventListener("click", checkAndShow);