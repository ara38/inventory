class General_itemsLib {

    static getReqAttrAndTypes(){
        return {"price": "number", "description": "string", "id": "number", "title": "string"}
    } 


    static async create(id,title,description,price) {
        // verify parameters and create data to send to the route
        const arrayOfAttributes = 'id,title,description,price'.split(',');
        let routeGroupObj = {};
        for (let i = 0; i < arguments.length; i++) {
            if (
                typeof arguments[i] !==
                General_itemsLib.getReqAttrAndTypes()[arrayOfAttributes[i]]
            ) {
                throw `${arrayOfAttributes[i]} expects ${General_itemsLib.getReqAttrAndTypes()[arrayOfAttributes[i]]}, but recieved ${typeof arguments[i]}`;
            }
            routeGroupObj[arrayOfAttributes[i]] = arguments[i];
        }
        // Create and set id property to 0, currently required for the route
        routeGroupObj.id = '0';
        routeGroupObj.appToken = "a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb";

        // request to server
        let resStream = await fetch(`/createGeneral_items`, {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(routeGroupObj),
        })
        .catch((err) => {
            console.log('Error:', err)
            return false;
        });

        let res = await resStream.json();

        return {
            createdObj: res,
            status: resStream.status === 200
        };
    }


    static async read(id, attributes_dict){
        for (const [attr_name, attr_val] of Object.entries(attributes_dict)) {
            if (typeof attr_val !== General_itemsLib.getReqAttrAndTypes()[attr_name]) {
                throw "Bad Params! [Attribute Type Error]";
            }
        }
        attributes_dict["id"] = id;
        attributes_dict.appToken = "a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb";
        let result_stream = await fetch(`/readGeneral_items`, {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(attributes_dict)
        })
        .catch((err) => {
            console.log('Error: ', err);
            return false;
        });
        let res = await result_stream.json();

        return {
            readedObj:res,
            status:result_stream.status === 200
        };
    }


    static async update(id, attributes_dict) {
        for (const [attr_name, attr_val] of Object.entries(attributes_dict)) {
            if(!General_itemsLib.getReqAttrAndTypes()[attr_name]) 
                throw `${attr_name} is not an attribute of General_items`;

            if (typeof attr_val !== General_itemsLib.getReqAttrAndTypes()[attr_name]) {
                throw `[Attribute Type Error] ${attr_name} expected ${General_itemsLib.getReqAttrAndTypes()[attr_name]}, but received ${typeof attr_val}`;
            }
        }
        attributes_dict["id"] = id;
        attributes_dict.appToken = "a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb";
        let result_stream = await fetch(`/updateGeneral_items`, {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(attributes_dict)
        })
        .catch((err) => {
            console.log('Error: ', err);
            return false;
        });
        return result_stream.status === 200;
    }


    static async delete(id){
        if(typeof(id) !== "number") throw `[Attribute Type Error] ID expected of type 'number', but received of type ${typeof id}`;

        let resStream = await fetch(`/deleteGeneral_items`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, appToken:"a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb"})
        })
        .catch((err) => {
            console.log('Error: ', err);
            return false;
        });
        return resStream.status===200;
    }

}
