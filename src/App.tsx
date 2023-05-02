import React from "react";
import OptionsChainUI from "./components/OptionsChainUI/OptionsChainUI";
// import { dummyOptionChainData } from "./components/OptionsChainUI/dummyData";

function App() {
  return (
    <div className="App">
      {/* <OptionsChainUI callClickBtn="BOOM!" putClickBtn="POW!" /> */}
      <OptionsChainUI callClickFunction={() => alert("hello")} />
      {/* <OptionsChainUI /> */}
    </div>
  );
}

export default App;
