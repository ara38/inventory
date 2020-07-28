
const { DataTypes } = require('sequelize')
const { db } = require('../database')

const User_inventoryAttributes = {

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

}

const User_inventory = db.define('User_inventory', User_inventoryAttributes)

User_inventory.sync()

const isValidUser_inventory = async (objectId) => {
    const object = await User_inventory.findOne({where: {
        id: objectId
    }})
    .catch(err => {return false});
    if(object){
        return true;
    }
    return false;
}

const addUser_inventory = async (objectOfAttributes) => {
    const object = await User_inventory.create(objectOfAttributes)
    .catch(err => {console.log('err', err)});

    return object;
}

const readUser_inventory = async (objectId) => {
    if(!isValidUser_inventory(objectId)){
        return null;
    }else{
        return await User_inventory.findOne({where: {
            id: objectId
        }})
    }
}

const findAll = async () => {
    const objects = await User_inventory.findAll()
    .catch(err => {})

    if(objects === undefined){
        console.log('Empty table');
        return {};
    }
    return objects;

}

const updateUser_inventory = async (objectId, attributesObject) => {
    if(!isValidUser_inventory(objectId)){
        return false;
    }
    await User_inventory.update(attributesObject, {where: {id: objectId}})
    .catch(err => false)

    return true;
}

const deleteUser_inventory = async (objectId) => {
    if(!isValidUser_inventory(objectId)){
        return false;
    }

    await User_inventory.destroy({where: {
        id: objectId
    }})
    .catch(err => false)

    return true;

}

module.exports = {isValidUser_inventory, addUser_inventory, readUser_inventory, updateUser_inventory, deleteUser_inventory, findAll, User_inventoryAttributes}

