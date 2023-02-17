const router = require('express').Router();
const {isAuthorized} = require('../middlewares/authenticationMiddleware')
const cryptoService = require('../services/cryptoService')
const {getErrorMessage} = require('../utils/errorUtils')
router.get('/create',isAuthorized, (req, res) =>{
    res.render('crypto/create')
});
router.post('/create',isAuthorized, async(req, res) =>{
    const cryptoData = req.body;
    try {
        
        await cryptoService.create(cryptoData);
        res.redirect('/crypto/catalog')
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)})
    }

});
module.exports = router;