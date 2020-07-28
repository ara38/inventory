const express = require('express');
const router = express.Router();

const General_itemsDB = require('../../database/General_items/General_items')
const Kit = require('../Kit/Kit')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.post('/createGeneral_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParams(req.body, General_itemsDB.General_itemsAttributes);
    if(!checkedParams){
       return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    const new_General_items = await General_itemsDB.addGeneral_items(req.body);

    if(!new_General_items){
       return res.status(Kit.ErrorCode_ServerError).send({'message':'Bad Params'});
    }

    return res.status(Kit.ErrorCode_Success).send(new_General_items);
})


router.post('/readGeneral_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    const retrieved_obj_General_items = await General_itemsDB.readGeneral_items(req.body['id'])

    if(!retrieved_obj_General_items){
       return res.status(Kit.ErrorCode_NotFound).send({'message':'Bad object id'});
    }

    return res.status(Kit.ErrorCode_Success).send(retrieved_obj_General_items)
})


router.post('/updateGeneral_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    if (! await General_itemsDB.updateGeneral_items(req.body['id'], req.body['data'])){
        return res.status(ErrorCode_NotFound).send({'message':'Bad object id'})
    }

    return res.status(Kit.ErrorCode_Success).send({})
})


router.post('/deleteGeneral_items', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    if (! await General_itemsDB.deleteGeneral_items(req.body['id'])){
        return res.status(Kit.ErrorCode_NotFound).send({'message':'Bad object id'})
    }
    return res.status(Kit.ErrorCode_Success).send({})
})

module.exports = router;
