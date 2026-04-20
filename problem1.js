function smallestDivisibleNumber(n) {
  let result = n;
  if (!Number.isInteger(n)) {
    return "Input is not Ineteger";
  }
  while (true) {
    let flag = true;
    for (let i = 1; i <= n; i++) {
      if (result % i !== 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return result;
    }
    result++;
  }
}
console.log(smallestDivisibleNumber(25));
//exponential
