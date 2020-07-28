import React from "react";
import "./App.css";
import { Text } from "office-ui-fabric-react/lib/Text";
import { DefaultButton } from "office-ui-fabric-react";

function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
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

export default App;
