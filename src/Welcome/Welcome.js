import React from 'react'
import "./Welcome.css";
import { Text } from "office-ui-fabric-react/lib/Text";
import { DefaultButton } from "office-ui-fabric-react";
import {BrowserRouter, Switch, Route} from "react-router-dom"

export default function Welcome() {
    return (
        <div style={{ textAlign: "center" }}>
          <Text variant={"mega"} block style={{ margin: "50px" }}>
            Welcome to this shopping website!
          </Text>
          <Text variant={"xxLarge"} block>
            Continue as:
          </Text>
          <div>
            <DefaultButton text="Admin" className="signInButton"></DefaultButton>
          </div>
          <div>
            <DefaultButton text="Shopper" className="signInButton"></DefaultButton>
          </div>
        </div>
      );
}
