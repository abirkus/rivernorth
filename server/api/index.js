const router = require('express').Router();
const {Apartment} = require('../db');
const Sequelize = require('sequelize');

router.get('/apartments', async (req, res, next) => {
	try {
		const result = await Apartment.findAll({
			attributes: [
				'id',
				'ClosedDate',
				'SoldPrice',
				'ListPrice',
				'ZipCode',
				'ApproxSqFt',
			],
			limit: 100,
		});
		res.json(result);
	} catch (err) {
		next(err);
	}
});

const Op = Sequelize.Op;

// router.get('/apartments/sqft', async (req, res, next) => {
// 	try {
// 		const result = await Apartment.findAll({
// 			attributes: [
// 				'id',
// 				'ClosedDate',
// 				'SoldPrice',
// 				'ListPrice',
// 				'ZipCode',
// 				'ApproxSqFt',
// 			],
// 			limit: 100,
// 			where: {
// 				ApproxSqFt: {
// 					[Op.not]: '0',
// 				},
// 			},
// 		});
// 		res.json(result);
// 	} catch (err) {
// 		next(err);
// 	}
// });

router.use((req, res, next) => {
	const err = new Error('not found');
	err.status = 404;
	next(err);
});

module.exports = router;
