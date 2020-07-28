const express = require('express');
const router = express.Router();

const User_inventoryDB = require('../../database/User_inventory/User_inventory')
const Kit = require('../Kit/Kit')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.post('/createUser_inventory', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParams(req.body, User_inventoryDB.User_inventoryAttributes);
    if(!checkedParams){
       return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    const new_User_inventory = await User_inventoryDB.addUser_inventory(req.body);

    if(!new_User_inventory){
       return res.status(Kit.ErrorCode_ServerError).send({'message':'Bad Params'});
    }

    return res.status(Kit.ErrorCode_Success).send(new_User_inventory);
})


router.post('/readUser_inventory', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    const retrieved_obj_User_inventory = await User_inventoryDB.readUser_inventory(req.body['id'])

    if(!retrieved_obj_User_inventory){
       return res.status(Kit.ErrorCode_NotFound).send({'message':'Bad object id'});
    }

    return res.status(Kit.ErrorCode_Success).send(retrieved_obj_User_inventory)
})


router.post('/updateUser_inventory', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    if (! await User_inventoryDB.updateUser_inventory(req.body['id'], req.body['data'])){
        return res.status(ErrorCode_NotFound).send({'message':'Bad object id'})
    }

    return res.status(Kit.ErrorCode_Success).send({})
})


router.post('/deleteUser_inventory', async function (req, res) {
    res.contentType('application/json');

    const checkedParams = await Kit.checkParam(req.body, 'id');
    if(!checkedParams){
        return res.status(Kit.ErrorCode_BadParams).send({'message':'Bad Params'});
    }

    if (! await User_inventoryDB.deleteUser_inventory(req.body['id'])){
        return res.status(Kit.ErrorCode_NotFound).send({'message':'Bad object id'})
    }
    return res.status(Kit.ErrorCode_Success).send({})
})

module.exports = router;
