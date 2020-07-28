from flask import Flask, jsonify, request, Blueprint
from database.User_inventory import *
from server.Kit import *
from config import tokenCheck

blueprint_User_inventory = Blueprint('blueprint_User_inventory', __name__)

@blueprint_User_inventory.route("/createUser_inventory", methods = ['POST'])
def createUser_inventoryRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParams(data, *User_inventory.params):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    new_User_inventory = createUser_inventory(
        data['id'],
        data['user_id'],
        data['item_id'],)
    if new_User_inventory is None:
        return jsonify(**{'message':'Bad Params'}), ErrorCode_ServerError
    return jsonify(**dict(new_User_inventory)), ErrorCode_Success


@blueprint_User_inventory.route("/readUser_inventory", methods = ['POST'])
def readUser_inventoryRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound
        
    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams
        
    retrieved_obj_User_inventory = readUser_inventory(int(data['id']))
    if retrieved_obj_User_inventory is None:
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**dict(retrieved_obj_User_inventory)), ErrorCode_Success


@blueprint_User_inventory.route("/updateUser_inventory", methods = ['POST'])
def updateUser_inventoryRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    if not (updateUser_inventory(int(data['id']), **data)):
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**{}), ErrorCode_Success


@blueprint_User_inventory.route("/deleteUser_inventory", methods = ['POST'])
def deleteUser_inventoryRoute():
    data = request.get_json()
    
    
    if not checkParam(data, 'appToken') or not tokenCheck(data['appToken']):
        return jsonify(**{'message':'Unsupported App'}), ErrorCode_BadParams

    
    #if not checkParams(data, 'token') or not isValidToken(data['token']):
    #    return jsonify(**{'message':'Bad Token'}), ErrorCode_NotFound

    #user = retrieveUser(data['token'])
    if not checkParam(data, 'id'):
        return jsonify(**{'message':'Bad Params'}), ErrorCode_BadParams

    if not (deleteUser_inventory(int(data['id']))):
        return jsonify(**{'message':'Bad object id'}), ErrorCode_NotFound
    return jsonify(**{}), ErrorCode_Success


if __name__ == "__main__":
    SERVER_ROOT = "127.0.0.1"
    app = Flask(__name__)
    app.debug = True
    app.register_blueprint(blueprint_User_inventory)
    app.run(port=2970)

