const express = require('express');
const router = express.Router();

const Specific_itemsDB = require('../../database/Specific_items/Specific_items')
const Kit = require('../Kit/Kit')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.post('/createSpecific_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParams(req.body, Specific_itemsDB.Specific_itemsAttributes);
    if(!checkedParams){
       return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    const new_Specific_items = await Specific_itemsDB.addSpecific_items(req.body);

    if(!new_Specific_items){
       return res.status(Kit.ErrorCode_ServerError).send({'message':'Bad Params'});
    }

    return res.status(Kit.ErrorCode_Success).send(new_Specific_items);
})


router.post('/readSpecific_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    const retrieved_obj_Specific_items = await Specific_itemsDB.readSpecific_items(req.body['id'])

    if(!retrieved_obj_Specific_items){
       return res.status(Kit.ErrorCode_NotFound).send({'message':'Bad object id'});
    }

    return res.status(Kit.ErrorCode_Success).send(retrieved_obj_Specific_items)
})


router.post('/updateSpecific_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    if (! await Specific_itemsDB.updateSpecific_items(req.body['id'], req.body['data'])){
        return res.status(ErrorCode_NotFound).send({'message':'Bad object id'})
    }

    return res.status(Kit.ErrorCode_Success).send({})
})


router.post('/deleteSpecific_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    if (! await Specific_itemsDB.deleteSpecific_items(req.body['id'])){
        return res.status(Kit.ErrorCode_NotFound).send({'message':'Bad object id'})
    }
    return res.status(Kit.ErrorCode_Success).send({})
})

module.exports = router;
