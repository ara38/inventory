class Specific_itemsLib {

    static getReqAttrAndTypes(){
        return {"specific_item_id": "number", "id": "number", "general_item_id": "number"}
    } 


    static async create(id,specific_item_id,general_item_id) {
        // verify parameters and create data to send to the route
        const arrayOfAttributes = 'id,specific_item_id,general_item_id'.split(',');
        let routeGroupObj = {};
        for (let i = 0; i < arguments.length; i++) {
            if (
                typeof arguments[i] !==
                Specific_itemsLib.getReqAttrAndTypes()[arrayOfAttributes[i]]
            ) {
                throw `${arrayOfAttributes[i]} expects ${Specific_itemsLib.getReqAttrAndTypes()[arrayOfAttributes[i]]}, but recieved ${typeof arguments[i]}`;
            }
            routeGroupObj[arrayOfAttributes[i]] = arguments[i];
        }
        // Create and set id property to 0, currently required for the route
        routeGroupObj.id = '0';
        routeGroupObj.appToken = "a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb";

        // request to server
        let resStream = await fetch(`/createSpecific_items`, {
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
            if (typeof attr_val !== Specific_itemsLib.getReqAttrAndTypes()[attr_name]) {
                throw "Bad Params! [Attribute Type Error]";
            }
        }
        attributes_dict["id"] = id;
        attributes_dict.appToken = "a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb";
        let result_stream = await fetch(`/readSpecific_items`, {
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
            if(!Specific_itemsLib.getReqAttrAndTypes()[attr_name]) 
                throw `${attr_name} is not an attribute of Specific_items`;

            if (typeof attr_val !== Specific_itemsLib.getReqAttrAndTypes()[attr_name]) {
                throw `[Attribute Type Error] ${attr_name} expected ${Specific_itemsLib.getReqAttrAndTypes()[attr_name]}, but received ${typeof attr_val}`;
            }
        }
        attributes_dict["id"] = id;
        attributes_dict.appToken = "a3c4bc3e-f4d4-47e9-89f0-ef6e670e66bb";
        let result_stream = await fetch(`/updateSpecific_items`, {
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

        let resStream = await fetch(`/deleteSpecific_items`,{
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
