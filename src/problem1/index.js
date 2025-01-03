// Problem 1: Three ways to sum to n
// Duration: You should not spend more than 2 hours on this problem.
// Time estimation is for internship roles, if you are a software professional you should spend significantly less time.
// Task
// Provide 3 unique implementations of the following function in JavaScript.
// Input: n - any integer
// Assuming this input will always produce a result lesser than Number.MAX_SAFE_INTEGER.
// Output: return - summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.

const checkN = (n) => {
  if (n < 0) {
    throw new Error("Input must be a positive integer");
  }
};

// 1. Using a for loop
export const sumToN = (n) => {
  checkN(n);
  if (n === 0 || n === 1) return n;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// 2. Using reduce method
export const sumToNReduce = (n) => {
  checkN(n);
  if (n === 0 || n === 1) return n;
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
};

// 3. Using a recursive function
export const sumToNRecursive = (n) => {
  checkN(n);
  if (n === 0 || n === 1) return n;
  return n + sumToNRecursive(n - 1);
};
