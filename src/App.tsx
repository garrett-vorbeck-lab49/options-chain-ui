import React from "react";
import OptionsChainUI from "./components/OptionsChainUI/OptionsChainUI";
import { dummyOptionChainData } from "./components/OptionsChainUI/dummyData";

function App() {
  return (
    <div className="App">
      <OptionsChainUI data={dummyOptionChainData} />
    </div>
  );
}

export default App;
