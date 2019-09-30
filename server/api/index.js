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

router.put('/apartments/custom', async (req, res, next) => {
	let start = req.body.dateStart;
	let end = req.body.dateEnd;
	let limit = req.body.limit;

	let zip = req.body.zipcode;

	const Op = Sequelize.Op;

	if (!req.body.dateStart) {
		start = '2007-01-01';
	}

	if (!req.body.dateEnd) {
		end = '2019-09-27';
	}

	console.log('START _END', start, end);
	try {
		const apts = await Apartment.findAll({
			limit,
			where: {
				ZipCode: {
					[Op.or]: zip,
				},
				ClosedDate: {
					[Op.gt]: new Date(start),
					[Op.lt]: new Date(end),
				},
			},
			attributes: [
				'id',
				'ClosedDate',
				'SoldPrice',
				'ListPrice',
				'ZipCode',
				'ApproxSqFt',
			],
		});
		res.json(apts);
	} catch (err) {
		next(err);
	}
});

router.use((req, res, next) => {
	const err = new Error('not found');
	err.status = 404;
	next(err);
});

module.exports = router;
