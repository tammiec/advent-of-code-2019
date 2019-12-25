const fs = require('fs');

const readFile = () => {
	let data = fs.readFileSync('./input.txt', 'utf-8');
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
  
  addParent(planet) {
    this.parent = planet;
  }
	
	totalOrbiters(acc = 0) {
    let total = acc;
    for (let planet of this.orbiters) {
      total++;
      planet.totalOrbiters(total);
    }
    console.log(`total for ${this.name} is ${total}`);
    return total;
	}
}

// write a function to map out planets in orbit to tree structure

const mapPlanets = (orbits) => {

	const splitOrbits = orbits.map(code => {
		const relation = code.split(')');
		return { inner: new Planet(relation[0]), outer: new Planet(relation[1]) }
  });

  console.log('all planets', splitOrbits);

  let planetsInOrbit = {};
	
	for (let pair of splitOrbits) {
    const parent = pair.inner;
    const orbiter = pair.outer;

    if (planetsInOrbit[parent.name]) {
      planetsInOrbit[parent.name].addOrbiter(orbiter);
    } else {
      parent.addOrbiter(orbiter);
      planetsInOrbit[parent.name] = parent;
    }

    orbiter.addParent(parent);
    planetsInOrbit[orbiter.name] = orbiter;

  }
	console.log('planets', planetsInOrbit);
	return planetsInOrbit;
};

const mappedPlanets = mapPlanets(input);

// get the parent node

const getRootPlanet = (planets) => {

  let root;
  
  for (let planet in planets) {
    console.log('keys', Object.keys(planets[planet]))
    if (Object.keys(planets[planet]).includes('parent') === false) {
      console.log('finding root:', planets[planet]);
      root = planets[planet];
    }
  }
  console.log('root:', root)
  return root;

};

const rootPlanet = getRootPlanet(mappedPlanets);
console.log('rootPlanet:', rootPlanet)

// use method to get total number of orbiters at the parent node

rootPlanet.totalOrbiters();