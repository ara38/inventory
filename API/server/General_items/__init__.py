from flask import Flask, jsonify, request, Blueprint
from database.General_items import *
from server.Kit import *
from config import tokenCheck

blueprint_General_items = Blueprint('blueprint_General_items', __name__)

@blueprint_General_items.route("/createGeneral_items", methods = ['POST'])
def createGeneral_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParams(data, *General_items.params):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    new_General_items = createGeneral_items(
        data['id'],
        data['title'],
        data['description'],
        data['price'],)
    if new_General_items is None:
        return jsonify(**{'message':'Bad Params'}), ErrorCode_ServerError
    return jsonify(**dict(new_General_items)), ErrorCode_Success


@blueprint_General_items.route("/readGeneral_items", methods = ['POST'])
def readGeneral_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound
        
    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams
        
    retrieved_obj_General_items = readGeneral_items(int(data['id']))
    if retrieved_obj_General_items is None:
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**dict(retrieved_obj_General_items)), ErrorCode_Success


@blueprint_General_items.route("/updateGeneral_items", methods = ['POST'])
def updateGeneral_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    if not (updateGeneral_items(int(data['id']), **data)):
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**{}), ErrorCode_Success


@blueprint_General_items.route("/deleteGeneral_items", methods = ['POST'])
def deleteGeneral_itemsRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    if not (deleteGeneral_items(int(data['id']))):
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**{}), ErrorCode_Success


if __name__ == "__main__":
    SERVER_ROOT = "127.0.0.1"
    app = Flask(__name__)
    app.debug = True
    app.register_blueprint(blueprint_General_items)
    app.run(port=2970)

