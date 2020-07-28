
const { DataTypes } = require('sequelize')
const { db } = require('../database')

const Specific_itemsAttributes = {

    general_item_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

}

const Specific_items = db.define('Specific_items', Specific_itemsAttributes)

Specific_items.sync()

const isValidSpecific_items = async (objectId) => {
    const object = await Specific_items.findOne({where: {
        id: objectId
    }})
    .catch(err => {return false});
    if(object){
        return true;
    }
    return false;
}

const addSpecific_items = async (objectOfAttributes) => {
    const object = await Specific_items.create(objectOfAttributes)
    .catch(err => {console.log('err', err)});

    return object;
}

const readSpecific_items = async (objectId) => {
    if(!isValidSpecific_items(objectId)){
        return null;
    }else{
        return await Specific_items.findOne({where: {
            id: objectId
        }})
    }
}

const findAll = async () => {
    const objects = await Specific_items.findAll()
    .catch(err => {})

    if(objects === undefined){
        console.log('Empty table');
        return {};
    }
    return objects;

}

const updateSpecific_items = async (objectId, attributesObject) => {
    if(!isValidSpecific_items(objectId)){
        return false;
    }
    await Specific_items.update(attributesObject, {where: {id: objectId}})
    .catch(err => false)

    return true;
}

const deleteSpecific_items = async (objectId) => {
    if(!isValidSpecific_items(objectId)){
        return false;
    }

    await Specific_items.destroy({where: {
        id: objectId
    }})
    .catch(err => false)

    return true;

}

module.exports = {isValidSpecific_items, addSpecific_items, readSpecific_items, updateSpecific_items, deleteSpecific_items, findAll, Specific_itemsAttributes}

