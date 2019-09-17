const router = require('express').Router();
const {Apartment} = require('../db');

router.get('/apartments', async (req, res, next) => {
	try {
		const result = await Apartment.findAll({limit: 100});
		res.json(result);
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
