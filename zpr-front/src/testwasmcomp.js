import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import createModule from "./test.mjs"

function App() {
  const [add, setAdd] = useState()
  const [testfun, setTestfun] = useState()
  useEffect(
    () => {
      createModule().then((Module) => {
        setAdd(() => Module.cwrap("add", "number", ["number", "number"]))
        setTestfun(() => Module.cwrap("testfun", "number"))
      })
    }
  )

  if (!add) {
    return "Loading webassembly...";
  }

  const result = add(2, 3)
  const result2 = testfun()

  return (
    <div className="App">
      <h1>{result}</h1>
      <h1>{result2}</h1>
    </div>
  );
}

export default App;
