const db = require('./database');
const Sequelize = require('sequelize');

const Apartment = db.define('apartment', {
	MLS: Sequelize.STRING,
	Status: Sequelize.STRING,
	SearchPrice: Sequelize.STRING,
	NumberOfRooms: Sequelize.STRING,
	Bedrooms: Sequelize.STRING,
	FullBaths: Sequelize.STRING,
	ApproxYearBuilt: Sequelize.STRING,
	ApproxSqFt: Sequelize.STRING,
	Taxes: Sequelize.STRING,
	Assessment: Sequelize.STRING,
	ZipCode: Sequelize.STRING,
	SoldPrice: Sequelize.STRING,
	ListPrice: Sequelize.STRING,
	ClosedDate: Sequelize.STRING,
	ListDate: Sequelize.STRING,
	ListDateReceived: Sequelize.STRING,
	OffMarketDate: Sequelize.STRING,
	StatusDate: Sequelize.STRING,
	Beds: Sequelize.STRING,
});

module.exports = Apartment;
