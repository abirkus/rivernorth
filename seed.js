const {green, red} = require('chalk');
const {db, Apartment} = require('./server/db');
const seedDataFultonMarket = require('./seed/fultonmarket');
const seedDataRiverNorth = require('./seed/rivernorth');
const seedDataGoldCoast = require('./seed/goldcoast');
const seedDataLoganSquare = require('./seed/logansquare');
const seedDataUkrainianVillage = require('./seed/ukrainianvillage');

// const seed = () => {
// 	console.log('TEST', seedData[0]);
// };

const seed = async () => {
	try {
		await db.sync({force: true});
		await Apartment.bulkCreate(seedDataFultonMarket);
		await Apartment.bulkCreate(seedDataGoldCoast);
		await Apartment.bulkCreate(seedDataLoganSquare);
		await Apartment.bulkCreate(seedDataRiverNorth);
		await Apartment.bulkCreate(seedDataUkrainianVillage);
	} catch (err) {
		console.log('Error seeding bulk file', err);
	}
};

seed()
	.then(() => {
		console.log(green('Seeding success!'));
		db.close();
	})
	.catch(err => {
		console.error(red('Oh noes! Something went wrong!'));
		console.error(err);
		db.close();
	});

module.exports = seed;
