### Problem 1

Provide 3 unique implementations of the following function in JavaScript.

Input: n - any integer

Assuming this input will always produce a result lesser than Number.MAX_SAFE_INTEGER.

Output: return - summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.

-------

### Run test

```bash
npm install
npm run test
```

### Edge cases

As the test did not specify that the input is always a positive integer, I added some edge cases to the test.

- Input is less than 0 -> throw error
- Input is 0 -> return 0
- Input is 1 -> return 1
