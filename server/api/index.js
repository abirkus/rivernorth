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

router.get('/apartments/filter', async (req, res, next) => {
	let whereConditions = {};
	let orderConditions = [];
	let limit = req.query.limit ? Number(req.query.limit) : 15;
	let offset = req.query.offset ? Number(req.query.offset) : 0;
	if (req.query.search) {
		let search =
			req.query.search[0].toUpperCase() + req.query.search.slice(1);
		whereConditions.name = {[Op.substring]: search};
	}
	if (req.query.price) {
		orderConditions.push(['price', req.query.price]);
	}
	try {
		const items = await Item.findAll({
			limit,
			offset,
			order: orderConditions,
			where: whereConditions,
			subQuery: false,
		});
		res.json(items);
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
