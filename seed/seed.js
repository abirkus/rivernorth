const {green, red} = require('chalk');
const {db, Apartment} = require('../server/db');
const seedData = require('./rivernorth.json');

// const seed = () => {
// 	console.log('TEST', seedData[0]);
// };

const seed = async () => {
	try {
		await db.sync({force: true});
		await Apartment.bulkCreate(seedData);
	} catch (err) {
		console.log('Error seeding bulk file', err);
	}
};

seed();
// module.exports = seed;

// if (require.main === module) {
// 	seed()
// 		.then(() => {
// 			console.log(green('Seeding success!'));
// 			db.close();
// 		})
// 		.catch(err => {
// 			console.error(red('Oh noes! Something went wrong!'));
// 			console.error(err);
// 			db.close();
// 		});
// }
