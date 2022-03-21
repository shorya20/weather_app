import React from 'react';
import moment from 'moment';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import $ from 'jquery';
function DisplayData(props) {
  const {data} = props;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var today = new Date();
  const day = today.getDay();
  const month = today.getMonth();
  let otherDayForecast = '';
  function recommendation(data){
    if(data.current.weather[0].main=="Rain"||data.current.weather[0].main=="drizzle"||data.current.weather[0].main.toLowerCase()=="thunderstorm"){
      return document.getElementsByClassName("recommendations").innerHTML ="Recommendation: don't forget to take an umbrella";
    }
    else if(data.current.weather[0].main=="Snow"){
      return document.getElementsByClassName("recommendations").innerHTML ="Recommendation: wear warmer clothes today!";
    }
    return;
  }
  const iconurl = "http://openweathermap.org/img/wn/" + `${data.current.weather[0].icon}` +"@2x.png";
  // console.log(data);
  const weekforecast = data.daily.forEach((day,index) => {
      if(index!=0){
        otherDayForecast+='<div class="place_temp_future"><div class="date">'+moment(day.dt*1000).format('dddd')+', '+moment(day.dt*1000).format('Do')+'</div><div class="temp"><img src ="http://openweathermap.org/img/wn/'+data.daily[index].weather[0].icon+'.png"></img>'+'<p>Max '+Math.round(data.daily[index].temp.max)+'°C</p><p>Min '+Math.round(data.daily[index].temp.min)+'°C</p></div></div></div>'
      }
  });
  return(
    <div>
        <div className="placeinfo">
          <div className="top">
            <div className="date_time">{today.toLocaleString('en-US',{timeZone:data.timezone,weekday:'short',hour:'numeric',minute:'numeric',year:'numeric'})}</div>
          </div>
        </div>
        <div className="place_temp_current">
          <div className="temp">  
            <h1>{Math.round(data.current.temp)}°C</h1>
            <img src = {iconurl} className="cur-weather-icon"></img>
            <p>Max {Math.round(data.daily[0].temp.max)}°C</p>
            <p>Min {Math.round(data.daily[0].temp.min)}°C</p>
          </div>
          <div className="indexes">
          <div className="description"><p>{data.current.weather[0].description}</p></div>
            <div className="feelslike"><p>Feels like {data.current.feels_like.toFixed()}°C</p></div>
            <div className='humidity'><p>Precipitation chance: {Math.round(data.daily[0].pop*100)}%</p></div>
            <div className = "uvindex"><p>UV Index: {Math.round(data.daily[0].uvi)}</p></div>
            <div className = "windspeed"><p>Wind speed: {Math.round(data.current.wind_speed)}mph</p></div>
            <div className = "recommendations">{recommendation(data)}</div>
          </div>
        </div>
        <div id="displayforecast">
          { ReactHtmlParser (otherDayForecast)}
        </div>
    </div>
  );
}
export default DisplayData;