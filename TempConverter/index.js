function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

const celsius = 25;
const fahren = celsiusToFahrenheit(celsius);

console.log(`${celsius}C is ${fahren}F`);