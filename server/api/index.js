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

	// if (req.body.dateStart) {
	// 	start = req.body.dateStart.split('-');
	// 	let temp = start.shift().slice(2);
	// 	start.push(temp);
	// 	if (Number(start[0]) < 10) {
	// 		start[0] = start[0].slice(1);
	// 	}
	// 	if (Number(start[1]) < 10) {
	// 		start[1] = start[1].slice(1);
	// 	}

	// 	start = start.join('/');
	// } else {
	// 	start = '1/1/2007';
	// }

	// if (req.body.dateEnd) {
	// 	end = req.body.dateEnd.split('-');
	// 	let temp2 = end.shift().slice(2);
	// 	end.push(temp2);

	// 	if (Number(end[0]) < 10) {
	// 		end[0] = end[0].slice(1);
	// 	}
	// 	if (Number(end[1]) < 10) {
	// 		end[1] = end[1].slice(1);
	// 	}
	// 	end = end.join('/');
	// } else {
	// 	end = '9/27/2019';
	// }
	const Op = Sequelize.Op;
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
