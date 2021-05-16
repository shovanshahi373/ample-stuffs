const memo = [0, 1];

const fib = (n) => {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  else {
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  }
};

console.log(fib(7));
