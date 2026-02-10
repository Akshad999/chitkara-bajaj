export function fibonacciSeries(n) {
  const res = [];
  if (n === 0) return res;
  if (n >= 1) res.push(0);
  if (n >= 2) res.push(1);
  for (let i = 2; i < n; i++) res.push(res[i - 1] + res[i - 2]);
  return res;
}

function gcd(a, b) {
  let x = Math.abs(a), y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

export function hcfOfArray(arr) {
  return arr.reduce((acc, cur) => gcd(acc, cur));
}

export function lcmOfArray(arr) {
  return arr.reduce((acc, cur) => lcm(acc, cur));
}
