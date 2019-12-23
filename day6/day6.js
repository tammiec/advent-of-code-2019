const fs = require('fs').promises;

const readFile = async () => {
	let data = await fs.readFile('./input.txt', 'utf-8');
	data = data.split('\n');
	console.log(data);
	return data;
}

const input = readFile();
