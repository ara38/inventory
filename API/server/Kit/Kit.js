const checkParam = async (json, paramName) => {
    return json && json.hasOwnProperty(paramName) && (json[paramName] || json[paramName] === 0);
}

const checkParams = async (json, params) => {
    if(!json){
        return false;
    }

    for(const param in params){
        if(!json.hasOwnProperty(param) || !json[param]){
            return false;
        }
    }

    return true;

}

const ErrorCode_ServerError   =   500;
const ErrorCode_NotFound      =   404;
const ErrorCode_BadParams     =   400;
const ErrorCode_Success       =   200;
const ErrorCode_ObjectCreated =   201;

module.exports = { checkParam, checkParams, ErrorCode_ServerError, ErrorCode_NotFound, ErrorCode_BadParams, ErrorCode_Success, ErrorCode_ObjectCreated }
