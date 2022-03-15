import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import {autoComplete} from "./components/Weather"
import axios from "react";
const api_weather ={
  key: "2668805bfb8558238a0a70ef6be4f2f8",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  return (
    <div className="App">
      <Weather/>
      
    </div>
  );
}
export default App;
