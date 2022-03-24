import React, {useEffect, useRef, useState} from "react";
import {ButtonGroup,ToggleButton,Dropdown,DropdownButton,Container,Row} from 'react-bootstrap';
import "./weather.css";
import 'bootstrap/dist/css/bootstrap.min.css' 
import {ArrowDropDown,GpsFixed} from "@mui/icons-material";
import DisplayData from "./DisplayData";
import $ from 'jquery';
import { render } from "@testing-library/react";
const apikey ="AIzaSyDAQnA5O4dCo3o8prv1akaCrd9e9oPqFLg";
const apibase ="https://maps.googleapis.com/maps/api/js";
const geobase = "https://maps.googleapis.com/maps/api/geocode/json";
var lang = "en";
var units = "metric";
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
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('metric');
    
    const radios = [
        { name: 'Celsius', value: 'metric' },
        { name: 'Fahrenheit', value: 'imperial'}
    ];
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
            const data = fetch(`${api_weather.base}?lat=${address.lat}&lon=${address.lon}&appid=${api_weather.key}&units=${units}`)
            .then((res)=>res.json())
            .then((data)=>data);
            const a = await data;
            setWeather({
                data:a
            })
        }
    }
    const reverseGeocode = async({latitude:lat,longitude:lng})=>{
        const data = fetch(`${api_weather.base}?lat=${lat}&lon=${lng}&appid=${api_weather.key}&lang=${lang}&units=${units}`)
            .then((res)=>res.json())
            .then((data)=>data);
            const a = await data;
            setWeather({
                data:a
            })
            const url = `${geobase}?key=${apikey}&latlng=${lat},${lng}`
            fetch(url)
                .then(response => response.json())
                .then(location => {
                const place = location.results[0];
                searchInput.current.value = place.address_components[1].short_name+','+place.address_components[3].short_name;
                })
    }
    const findMyLocation = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                reverseGeocode(position.coords)
            })
        }
    }
    async function langSelect (langset){
        lang = langset;
        if(weather.data!==undefined){
            const data = fetch(`${api_weather.base}?lat=${weather.data.lat}&lon=${weather.data.lon}&appid=${api_weather.key}&lang=${lang}&units=${units}`)
            .then((res)=>res.json())
            .then((data)=>data);
            const a = await data;
            setWeather({
                data:a
            })
        }
    }
    async function Units(unitschange){
        units = unitschange;
        if(weather.data!==undefined){
            const data = fetch(`${api_weather.base}?lat=${weather.data.lat}&lon=${weather.data.lon}&appid=${api_weather.key}&lang=${lang}&units=${units}`)
            .then((res)=>res.json())
            .then((data)=>data);
            const a = await data;
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
            autoComplete();
        })
    },[]);
    return (
    <div className="app">
        <main>
            <Container className="fluid">
                <Row className="align-items-start">
                    <div className="col-7">
                        <input ref={searchInput} type="text" className="col search-bar" placeholder="Search..."/>
                    </div>
                    <div className="col-2 gps-div">
                        <button className="gps btn input-block-level form-control" onClick={findMyLocation}><GpsFixed id="icon"/></button>
                    </div>
                    <div className="col-2 button-drop">
                        <DropdownButton className="dropdown-basic" title="Lang">
                            <Dropdown.Item onClick={()=>langSelect("en")}>English</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("de")}>German</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("zh_tw")}>Chinese</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("nl")}>Dutch</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("it")}>Italian</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("kr")}>Korean</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("ja")}>Japanese</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("hi")}>Hindi</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("el")}>Greek</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("fr")}>French</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("pt")}>Portuguese</Dropdown.Item>
                            <Dropdown.Item onClick={()=>langSelect("es")}>Spanish</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Row>
            </Container>
            <div>
                {

                    weather.data !== undefined ?(
                        <div>
                            <div className="row">
                                <ButtonGroup>
                                    {radios.map((radio, values) => (
                                    <ToggleButton 
                                        key={values}
                                        id={`radio-${values}`}
                                        type="radio"
                                        variant={values=="Celsius" ? 'outline-success' : 'outline-danger'}
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        onClick={(e) => Units(radio.value)}
                                    >   
                                        {radio.name}
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                            <DisplayData data ={[weather.data,units=="metric"?"°C":"°F"]} />
                        </div>
                    ) : null
                }
            </div>
        </main>
    </div>
    );
}
export default Weather;
