const input = { min: 138307, max: 654504 };

const passwordCounter = (min, max) => {
  let counter = 0;

  for (let i = min; i <= max; i++) {
    let password = Array.from(String(i), Number);
    let double = false;
    
    // check for increasing digits
    if (password[5] >= password[4] 
      && password[4] >= password[3] 
      && password[3] >= password[2] 
      && password[2] >= password[1] 
      && password[1] >= password[0]) {
        
        // count number of occurrences of each number
        let prevNums = {};
        
        for (let num of password) {
          if (prevNums[num]) {
            prevNums[num]++;
          } else {
            prevNums[num] = 1;
          }
        }

        // if number occurs twice, it is a double
        if (Object.values(prevNums).includes(2)) {
          double = true;
        }

    }

    if (double) {
      counter++;
    }
  }

  return counter;

}

console.log(passwordCounter(input.min, input.max));