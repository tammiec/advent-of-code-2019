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
	const splitOrbits = orbits.map(code => {
		const relation = code.split(')');
		return { inner: relation[0], outer: relation[1] }
	});
	console.log('orbits:', splitOrbits);
	console.log('count:', count);
	return count;

};

countOrbits(input);

