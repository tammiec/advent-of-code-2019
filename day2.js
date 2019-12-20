const input = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 10, 19, 1, 19, 6, 23, 2, 23, 13, 27, 1, 27, 5, 31, 2, 31, 10, 35, 1, 9, 35, 39, 1, 39, 9, 43, 2, 9, 43, 47, 1, 5, 47, 51, 2, 13, 51, 55, 1, 55, 9, 59, 2, 6, 59, 63, 1, 63, 5, 67, 1, 10, 67, 71, 1, 71, 10, 75, 2, 75, 13, 79, 2, 79, 13, 83, 1, 5, 83, 87, 1, 87, 6, 91, 2, 91, 13, 95, 1, 5, 95, 99, 1, 99, 2, 103, 1, 103, 6, 0, 99, 2, 14, 0, 0];

const intcode = input => {
  let output = [...input];

  for (let i = 0; i < output.length; i += 4) {

    if (output[i] === 99) {
      return output;
    } else if (output[i] === 1) {
      let a = output[i + 1];
      let b = output[i + 2];
      output[output[i + 3]] = output[a] + output[b];
    } else if (output[i] === 2) {
      let c = output[i + 1];
      let d = output[i + 2];
      output[output[i + 3]] = output[c] * output[d];
    }
  }

  console.log('output:', output)
  return output;
  
};

for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    let newInput = [...input];
    newInput[1] = i;
    newInput[2] = j;

    const answer = intcode(newInput);
    if (answer[0] === 19690720) {
      console.log(100 * answer[1] + answer[2]);
      return answer;
    }
  }

}