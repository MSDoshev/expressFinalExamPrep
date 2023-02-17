const router = require('express').Router();
const {isAuthorized} = require('../middlewares/authenticationMiddleware')
const cryptoService = require('../services/cryptoService')
const {getErrorMessage} = require('../utils/errorUtils')
const {paymentMethodsMap} = require('../constants')
router.get('/catalog', async (req, res) =>{
    const crypto = await cryptoService.getAll();

res.render('crypto/catalog', {crypto});
});

router.get('/:cryptoId/details', async (req, res) =>{
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers?.some( id => id == req.user?._id)

    res.render('crypto/details', {crypto, isOwner, isBuyer})
});

router.get('/:cryptoId/buy',isAuthorized, async (req, res) =>{
    await cryptoService.buy(req.user._id, req.params.cryptoId);
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuthorized, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    
    const paymentMethods = Object.keys(paymentMethodsMap).map(value => ({
        value, 
        label: paymentMethodsMap[value],
        isSelected: crypto.paymentMethod == value,
    }));


    res.render('crypto/edit', {crypto, paymentMethods});
});
router.post('/:cryptoId/edit', isAuthorized, async (req, res) => {
    const cryptoData = req.body
    //TODO edit 
    await cryptoService.edit(req.params.cryptoId, cryptoData);

    //check if owner
    res.redirect(`/crypto/${req.params.cryptoId}/details`)

   
});

router.get('/:cryptoId/delete', isAuthorized, async (req, res) => {
    //TODO delete 
    await cryptoService.delete(req.params.cryptoId);
    res.redirect('/crypto/catalog')
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