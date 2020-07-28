from flask import Flask, jsonify, request, Blueprint
from database.Specific_items import *
from server.Kit import *
from config import tokenCheck

blueprint_Specific_items = Blueprint('blueprint_Specific_items', __name__)

@blueprint_Specific_items.route("/createSpecific_items", methods = ['POST'])
def createSpecific_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParams(data, *Specific_items.params):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    new_Specific_items = createSpecific_items(
        data['id'],
        data['specific_item_id'],
        data['general_item_id'],)
    if new_Specific_items is None:
        return jsonify(**{'message':'Bad Params'}), ErrorCode_ServerError
    return jsonify(**dict(new_Specific_items)), ErrorCode_Success


@blueprint_Specific_items.route("/readSpecific_items", methods = ['POST'])
def readSpecific_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound
        
    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams
        
    retrieved_obj_Specific_items = readSpecific_items(int(data['id']))
    if retrieved_obj_Specific_items is None:
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**dict(retrieved_obj_Specific_items)), ErrorCode_Success


@blueprint_Specific_items.route("/updateSpecific_items", methods = ['POST'])
def updateSpecific_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    if not (updateSpecific_items(int(data['id']), **data)):
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**{}), ErrorCode_Success


@blueprint_Specific_items.route("/deleteSpecific_items", methods = ['POST'])
def deleteSpecific_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    if not (deleteSpecific_items(int(data['id']))):
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**{}), ErrorCode_Success


if __name__ == "__main__":
    SERVER_ROOT = "127.0.0.1"
    app = Flask(__name__)
    app.debug = True
    app.register_blueprint(blueprint_Specific_items)
    app.run(port=2970)

