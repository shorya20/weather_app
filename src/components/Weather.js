import React, {useEffect, useRef} from "react";
import "./weather.css"
import {Search} from "@mui/icons-material"
const apikey ="AIzaSyDAQnA5O4dCo3o8prv1akaCrd9e9oPqFLg";
const apibase ="https://maps.googleapis.com/maps/api/js";

//load google map api js
function loadAsyncScript(src){
    return new Promise((resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load",()=>resolve(script));
        document.head.appendChild(script);
    }))
}

export function Weather() {
    const searchInput = useRef(null);
    const initMapScript = () => {
        //if script from api is already loaded
        if(window.google){
            return Promise.resolve();
        }
        const src = `${apibase}?key=${apikey}&libraries=places&v=weekly`;
        console.log(src)
        return loadAsyncScript(src);
    }
    const extractPlace = (autocomplete) => {
        const location = autocomplete.getPlace();
        console.log(location);
    }
    //complete the autocomplete function
    const autoComplete = () => {
        if(!searchInput.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component","geometry"]);
        autocomplete.addListener("place_changed", () => extractPlace(autocomplete));
    }
    //now use react hook to load map script after mount. check in console if script map loaded
    useEffect(() =>{
        initMapScript().then(()=>{
            autoComplete()
        })
    },[]);
    return (
    <div className="app">
        <main>
            <header id="header">
                <input ref={searchInput} type="text" className="search-bar" placeholder="Search..."/>
                <Search className="icon"/>
                &nbsp;
            </header>
            <div className="cloudy">
            </div> 
        </main>
    </div>
    );
}
export default Weather;
