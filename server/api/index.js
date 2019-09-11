const router = require('express').Router();

// router.use('/users');

router.use((req, res, next) => {
	const err = new Error('not found');
	err.status = 404;
	next(err);
});

module.exports = router;
