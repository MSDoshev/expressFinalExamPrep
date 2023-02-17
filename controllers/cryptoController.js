const router = require('express').Router();
const {isAuthorized} = require('../middlewares/authenticationMiddleware')
const cryptoService = require('../services/cryptoService')
const {getErrorMessage} = require('../utils/errorUtils')

router.get('/catalog', async (req, res) =>{
    const crypto = await cryptoService.getAll();

res.render('crypto/catalog', {crypto});
});

router.get('/:cryptoId/details', async (req, res) =>{
    const crypto = await cryptoService.getOne(req.params.cryptoId)

    const isOwner = crypto.owner == req.user?._id;

    res.render('crypto/details', {crypto, isOwner})
});

router.get('/:cryptoId/buy', (req, res) =>{
    
});

router.get('/create',isAuthorized, (req, res) =>{
    res.render('crypto/create')
});
router.post('/create',isAuthorized, async(req, res) =>{
    const cryptoData = req.body;
    try {
        
        await cryptoService.create(req.user._id, cryptoData);
        res.redirect('/crypto/catalog')
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)})
    }

});
module.exports = router;