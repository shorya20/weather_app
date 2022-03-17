import React from 'react';
function DisplayData(props) {
  const {data} = props;
  var today = new Date();
  console.log(data);
  return(
    <div>
        <div className="placeinfo">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="date">
              <p>As of {today.getDate()}-{today.getMonth()+1}-{today.getFullYear()}</p>
              <p>{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
        <div className="place_temp_current">
          <div className="temp">
            <p>{Math.round(data.main.temp)}°C</p>
          </div>
        </div>
    </div>
  )
}
export default DisplayData;