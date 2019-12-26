const fs = require('fs');

const readFile = () => {
	let data = fs.readFileSync('./input.txt', 'utf-8');
  data = data.split('\n').map(code => code.split(')'));
	console.log(data);
	return data;
};

// const input = readFile();

const input = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L,K)YOU,I)SAN'.split(',').map(code => code.split(')'));

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
	
	getPathToRoot() {
		let path = [];
		let currentPlanet = this;
		let i = 0;
		
		while (currentPlanet.parent) {
			path.push(currentPlanet.parent.name);
			currentPlanet = currentPlanet.parent;
			i++;
		}
		console.log(`the path for ${this.name} is: ${path}`);
		return path;
	}
	
}

// write a class to map out planets in orbit to linked list structure

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
  }
  
  closestCommonParent(p1 = 'YOU', p2 = 'SAN') {
  	let p1Path = this.planets[p1].getPathToRoot();
  	let p2Path = this.planets[p2].getPathToRoot();
  	
  	if ( p1 === p2 || !this.planets[p1].parent || this.planets[p2].parent.name === p1) {
  		return this.planets[p1];
  	} else if (this.planets[p1].parent.name === p2 || !this.planets[p2].parent) {
  		return this.planets[p2];
  	} else {
  		let closest;
  		for (let planet of p1Path) {
  			if (p2Path.includes(planet)) {
  				closest = this.planets[planet];
  				break;
  			}
  		}
  		
  		return { p1Path, p2Path, closest };
  	}
  }

};

// RUN CODE
const map = new PlanetMap(input);
// console.log('map', map.planets);
// console.log('total', map.getTotalOrbits());
console.log('closest', map.closestCommonParent());
