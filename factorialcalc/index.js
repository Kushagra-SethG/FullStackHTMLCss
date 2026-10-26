const number = 5;
let factorial = 1;
let counter = 1;

while (counter <= number) {
  factorial *= counter;
  counter++;
}

console.log(`The factorial of ${number} is ${factorial}`);

const factorialArrow = (n) => {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};
console.log(factorialArrow(5));