const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.title = 'Home';
    res.render('index.ejs');
});
router.get('/about', (req, res) => {
    res.locals.title = 'About';
    res.render('about.ejs');
});

module.exports = router;