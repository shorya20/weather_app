import React from "react";
import "./components/weather.css";
import Weather from "./components/Weather";
import 'bootstrap/dist/css/bootstrap.min.css' ;
import 'bootstrap';
function App() {
  return (
    <main>
      <div className="container-fluid App-bgimage">
        <Weather />
      </div>
    </main>
  );
}
export default App;
