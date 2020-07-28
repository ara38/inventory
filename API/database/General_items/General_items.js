
const { DataTypes } = require('sequelize')
const { db } = require('../database')

const General_itemsAttributes = {

    title: {
        type: DataTypes.STRING,
        allowNull: true
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true
    },

}

const General_items = db.define('General_items', General_itemsAttributes)

General_items.sync()

const isValidGeneral_items = async (objectId) => {
    const object = await General_items.findOne({where: {
        id: objectId
    }})
    .catch(err => {return false});
    if(object){
        return true;
    }
    return false;
}

const addGeneral_items = async (objectOfAttributes) => {
    const object = await General_items.create(objectOfAttributes)
    .catch(err => {console.log('err', err)});

    return object;
}

const readGeneral_items = async (objectId) => {
    if(!isValidGeneral_items(objectId)){
        return null;
    }else{
        return await General_items.findOne({where: {
            id: objectId
        }})
    }
}

const findAll = async () => {
    const objects = await General_items.findAll()
    .catch(err => {})

    if(objects === undefined){
        console.log('Empty table');
        return {};
    }
    return objects;

}

const updateGeneral_items = async (objectId, attributesObject) => {
    if(!isValidGeneral_items(objectId)){
        return false;
    }
    await General_items.update(attributesObject, {where: {id: objectId}})
    .catch(err => false)

    return true;
}

const deleteGeneral_items = async (objectId) => {
    if(!isValidGeneral_items(objectId)){
        return false;
    }

    await General_items.destroy({where: {
        id: objectId
    }})
    .catch(err => false)

    return true;

}

module.exports = {isValidGeneral_items, addGeneral_items, readGeneral_items, updateGeneral_items, deleteGeneral_items, findAll, General_itemsAttributes}

