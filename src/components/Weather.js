import React, {useEffect, useRef, useState} from "react";
import {Button,Container,Row} from 'react-bootstrap';
import "./weather.css";
import 'bootstrap/dist/css/bootstrap.min.css' 
import {Search} from "@mui/icons-material";
import DisplayData from "./DisplayData";
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
    const api_weather = {
        key: "2668805bfb8558238a0a70ef6be4f2f8",
        base:"https://api.openweathermap.org/data/2.5/onecall"
    };
    const [weather,setWeather] = useState([]);
    const searchInput = useRef(null);
    const initMapScript = () => {
        //if script from api is already loaded
        if(window.google){
            return Promise.resolve();
        }
        const src = `${apibase}?key=${apikey}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    }
    const extractCity = (place) => {
        const address ={
            lat : place.geometry.location.lat(),
            lon : place.geometry.location.lng(),
        }
        return address;
    }
    const extractPlace = async (autocomplete) => {
        const location = autocomplete.getPlace();
        if(location.geometry == undefined){
            alert("Please select from the search options")
            return;
        }
        const address = extractCity(location);
        if(address.lat == undefined || address.lon == undefined){
            alert("Please select from the dropdown");
        }else{
            const data = fetch(`${api_weather.base}?lat=${address.lat}&lon=${address.lon}&appid=${api_weather.key}&units=metric`)
            .then((res)=>res.json())
            .then((data)=>data);
            const a = await data;
            console.log(a);
            setWeather({
                data:a
            })
        }
    }
    //complete the autocomplete function
    const autoComplete = () => {
        if(!searchInput.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component","geometry","name"]);
        autocomplete.addListener("place_changed", () => extractPlace(autocomplete));
    }
    //now use react hook to load map script after mount. check in console if script map loaded
    useEffect(function map(){
        initMapScript().then(()=>{
            autoComplete()
        })
    },[]);
    return (
    <div className="app">
        <main>
            <Container>
                <Row>
                <input ref={searchInput} type="text" className="search-bar justify-content center " placeholder="Search..."/>
                </Row>
            </Container>
            <div>
                {
                    weather.data !== undefined ?(
                        <div>
                            <DisplayData data ={weather.data} />
                        </div>
                    ) : null
                }
            </div>
        </main>
    </div>
    );
}
export default Weather;
