const input = { min: 138307, max: 654504 };

const passwordCounter = (min, max) => {
  let counter = 0;

  for (let i = min; i <= max; i++) {
    let password = Array.from(String(i), Number);
    let double = false;
    let prevNums = {};

    if (password[5] >= password[4] 
      && password[4] >= password[3] 
      && password[3] >= password[2] 
      && password[2] >= password[1] 
      && password[1] >= password[0]) {

        for (let num of password) {
          let prevNum;
          if (num === prevNum) {
            double = true;
            // if (prevNums[num]) {
            //   prevNums[num]++;
            // } else {
            //   prevNums[num] = 1;
            // }
          }
          prevNum = num;
        }

    }
    
    if (double) {
      counter++;
    }
  }

  return counter;

}

console.log(passwordCounter(input.min, input.max));