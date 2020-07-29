import React from 'react'
import { Text } from "office-ui-fabric-react/lib/Text";
import "./Nav.css"
import {Link} from "react-router-dom"


export default function Nav() {
    return (
        <div style={{display: "flex", margin: "0px", padding: "0px"}}>
            <div style={{textAlign: "left", width:"50%"}}>
                <Link to="/"><Text className="NavItem" variant="xxLarge">Home</Text></Link>
                <Link to="/shopper/shop"><Text className="NavItem" variant="xxLarge">Shop</Text></Link>
                <Link to="/shopper/inventory"><Text className="NavItem" variant="xxLarge">Inventory</Text></Link>   
            </div>
            <div style={{textAlign: "right", width: "50%"}}>
               
            </div>
        </div>
    )
}
