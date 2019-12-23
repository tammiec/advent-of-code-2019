const fs = require('fs').promises;

const readFile = async () => {
	let data = await fs.readFile('./input.txt', 'utf-8');
	data = data.split('\n');
	console.log(data);
	return data;
};

// const input = readFile();

const input = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(',');

const countOrbits = orbits => {

	let count = 0;
	
	return count;

};

countOrbits(input);

