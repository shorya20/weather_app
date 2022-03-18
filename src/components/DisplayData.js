import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
function DisplayData(props) {
  const {data} = props;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var today = new Date();
  const day = today.getDay();
  const month = today.getMonth();
  let otherDayForecast = ''
  // console.log(data);
  const weekforecast = data.daily.forEach((day_i,index) => {
      if(index!=0){
        otherDayForecast+='<div class="forecast_weather"><div class="place_temp_future"><div class="date">'+console.log(day_i)+', '+months[month]+'</div><div class="temp"><p>Max '+Math.round(data.daily[index].temp.max)+'°C</p><p>Min '+Math.round(data.daily[index].temp.min)+'°C</p></div></div></div>'
      }
  });
  return(
    <div>
        <div className="placeinfo">
          <div className="top">
            <div className="time">
              <p>{today.getHours() >= 13 ? today.getHours()%12 +':'+ today.getMinutes() + 'PM': today.getHours() +':'+ today.getMinutes() + 'AM'}</p>
            </div>
            <div className="date">{days[day]},{today.getDate()} {months[month]}</div>
          </div>
        </div>
        <div className="place_temp_current">
          <div className="temp">  
            <h1>{Math.round(data.current.temp)}°C</h1>
            <p>Max {Math.round(data.daily[0].temp.max)}°C</p>
            <p>Min {Math.round(data.daily[0].temp.min)}°C</p>
          </div>
          <div className="indexes">
            <div className="feelslike"><p>Feels like {data.current.feels_like.toFixed()}°C</p></div>
            <div className="description"><p>{data.current.weather[0].description}</p></div>
            <div className = "windspeed"><p>{Math.round(data.current.wind_speed)}mph</p></div>
            <div className = "uvindex"><p>UV Index: {Math.round(data.daily[0].uvi)}</p></div>
          </div>
        </div>
        <div id="displayforecast">
          { ReactHtmlParser (otherDayForecast)}
        </div>
    </div>
  );
}
export default DisplayData;