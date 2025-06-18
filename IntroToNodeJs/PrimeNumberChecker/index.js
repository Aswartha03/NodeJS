let { isPrime } = require("../PrimeNumberChecker/isPrime");

let arr = [2, 10, 17, 21, 29];

for (let ele of arr) {
  if (typeof ele !== "number") {
    console.log("Enter Valid Number...");
    return;
  }
  let result = isPrime(ele);
  result
    ? console.log(`${ele} is a prime number.`)
    : console.log(`${ele} is not a prime number.`);
}
