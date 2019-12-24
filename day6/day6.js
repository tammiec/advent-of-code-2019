const fs = require('fs').promises;

const readFile = async () => {
	let data = await fs.readFile('./input.txt', 'utf-8');
	data = data.split('\n');
	console.log(data);
	return data;
};

// const input = readFile();

const input = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(',');

// planet class
class Planet {
	constructor(name) {
		this.name = name;
		this.orbiters = [];
	}
	
	addOrbiter(planet) {
		this.orbiters.push(planet);
	}
	
	get totalOrbiters() {
		let total = 0;
		for (let planet of this.orbiters) {
			total += planet.totalOrbiters + 1;
			console.log(`total for ${this.name} is ${total}`);
		}
		return total;
	}
}

// write a function to map out planets in orbit to tree structure

const mapPlanets = (orbits) => {

	const planetsInOrbit = [];

	const splitOrbits = orbits.map(code => {
		const relation = code.split(')');
		return { inner: new Planet(relation[0]), outer: new Planet(relation[1]) }
	});
	//console.log(splitOrbits);
	
	for (let pair of splitOrbits) {
		pair.inner.addOrbiter(pair.outer);
		planetsInOrbit.push(pair.inner);
		planetsInOrbit.push(pair.outer);
		console.log('pair', pair);
	}
	console.log('planets', planetsInOrbit);
	return planetsInOrbit;
};

const mappedPlanets = mapPlanets(input);

// get the parent node

const getRootPlanet = (planets) => {

	const orbiters = [];
	
	for (let planet of planets) {
		if (planet.orbiters) {
			planet.orbiters.forEach(orbiter => orbiters.push(orbiter.name));
		};
	}
	
	console.log('orbiters', orbiters);
	
	const root = planets.filter(planet => !orbiters.includes(planet.name));
	console.log('root', root);
	
	return root[0];

};

const rootPlanet = getRootPlanet(mappedPlanets);

// use get method to get total number of orbiters at the parent node

console.log('number of orbiters', rootPlanet.totalOrbiters);
console.log(rootPlanet);
