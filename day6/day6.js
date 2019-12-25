const fs = require('fs');

const readFile = () => {
	let data = fs.readFileSync('./input.txt', 'utf-8');
  data = data.split('\n').map(code => code.split(')'));
	// console.log(data);
	return data;
};

// const input = readFile();

const input = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(',').map(code => code.split(')'));

// planet class
class Planet {
	constructor(name) {
    this.name = name;
    // this.orbiters = [];
    this.parent;
	}
	
	addOrbiter(planet) {
    this.orbiters.push(planet);
  }
  
  addParent(planet) {
    this.parent = planet;
  }
	
	count() {
    if (this.parent) {
      return this.parent.count() + 1;
    } else {
      return 0;
    }
	}
}

// write a class to map out planets in orbit to tree structure

class PlanetMap {

  constructor(input) {
    this.planets = {};

    // add planet to map if it doesn't already exist
    for (let [parent, orbiter] of input) {  
      if (!this.planets[orbiter]) {
        this.planets[orbiter] = new Planet(orbiter);
      }
      if (!this.planets[parent]) {
        this.planets[parent] = new Planet(parent);
      }
      
      // set parent-orbiter relationship
      this.planets[orbiter].addParent(this.planets[parent]);
  
    }
  }

  getTotalOrbits() {
    const total = Object.values(this.planets)
      .map(planet => planet.count())
      .reduce((a, b) => a + b);
    return total;
  };

};

// RUN CODE
const map = new PlanetMap(input);
console.log('map', map.planets);
console.log('total', map.getTotalOrbits());

// const mappedPlanets = mapPlanets(input);
// console.log('mappedPlanets:', mappedPlanets)

// const getTotalOrbits = (planets) => {
//   const sum = Object.values(planets)
//     .map(planet => planet.count())
//     .reduce((a, b) => a + b);
//   return sum;
// };

// const totalOrbits = getTotalOrbits(mappedPlanets);
// console.log('totalOrbits:', totalOrbits)


// get the parent node

// const getRootPlanet = (planets) => {

//   let root;
  
//   for (let planet in planets) {
//     console.log('keys', Object.keys(planets[planet]))
//     if (Object.keys(planets[planet]).includes('parent') === false) {
//       console.log('finding root:', planets[planet]);
//       root = planets[planet];
//     }
//   }
//   console.log('root:', root)
//   return root;

// };

// const rootPlanet = getRootPlanet(mappedPlanets);
// console.log('rootPlanet:', rootPlanet)

// use method to get total number of orbiters at the parent node

// rootPlanet.totalOrbiters();