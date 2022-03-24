import React from 'react';
import moment from 'moment';
import { Container, Row, Col, Stack, ProgressBar, Card} from 'react-bootstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './display.css';
export function DisplayData(props) {
  const data = props.data[0];
  const unit = props.data[1];
  var today = new Date();
  let otherDayForecast = '';
/* 
    Description of the section: This component will describe how implemented React-Bootstrap for responsive and a cleaner aesthetic design for our application.
    We used bootstrap components such as Cards, ProgressBar, Flexible containers, Cols and Rows. 

    Targets it solves for the application:
      - Simple effective and interactive design choices for our implementation with usage of both React-Bootstrap and CSS.
      - The DOM model is differentiated with containers holding rows and columns to showcase them as it can be seen in the 7-day forecast code. Therefore the 
      rendering of the individual columns holding data for that individual day will all be responsive and within that one row which is fixed at the center.
*/
  console.log(data);
  function recommendation(data){
    if(data.current.weather[0].main=="Rain"||data.current.weather[0].main=="Drizzle"||data.current.weather[0].main.toLowerCase()=="thunderstorm"){
      return document.getElementsByClassName("recommendations").innerHTML = <Card className="cardshape ">
      <Card.Body className="recombody ">
      <Card.Title>Recommendation</Card.Title>
      <Card.Text>
        Be careful! Please take an umbrella!
      </Card.Text>
      </Card.Body>
    </Card>;
    }
    else if(data.current.weather[0].main=="Snow"){
      return document.getElementsByClassName("recommendations").innerHTML =<Card className="cardshape">
      <Card.Body className="recombody">
      <Card.Title>Recommendation</Card.Title>
      <Card.Text>
        Please wear warmer clothes and keep winter gloves and a scarf with you!
      </Card.Text>
      </Card.Body>
    </Card>;
    }
    return;
  }
  const iconurl = "http://openweathermap.org/img/wn/" + `${data.current.weather[0].icon}` +"@2x.png";
  // console.log(data);
  // A loop that will display the 7-day forecast by date,an icon showing what the weather is like and the maximum/minum temperature 

  const weekforecast = data.daily.forEach((day,index) => {
      if(index!=0){
        otherDayForecast+='<div class="place_temp_future col"><div class="date"><p>'+moment(day.dt*1000).format('dddd')+','+moment(day.dt*1000).format('Do')+'</p></div><div class="temp"><img src ="http://openweathermap.org/img/wn/'+data.daily[index].weather[0].icon+'.png"></img>'+'<p>Max '+Math.round(data.daily[index].temp.max)+unit+'</p><p>Min '+Math.round(data.daily[index].temp.min)+unit+'</p></div></div>'
      }
  });

  // calculations to be displayed in the progress bar
  const barpop = Math.round(data.daily[0].pop*100);
  const baruv = Math.round(data.daily[0].uvi);
  const barhumidity= data.current.humidity;
  const barwind= Math.round(data.current.wind_speed);
  
  return(
    <div>
      <Container className="fluid">
          <Row>
          <div className="placeinfo">
              <div className="top">
                <h1 className="weatherdate"> {new Date().toLocaleString("en-US", { day : '2-digit'})} {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()}</h1>
                <h2 className="date_time">{today.toLocaleString('en-US',{timeZone:data.timezone,hour:'numeric',minute:'numeric'})}</h2>
              </div>
          </div>
          </Row>

        <div className="place_temp_current">
            <div className="currentweather">
              <Row class="rounded">
                <Col>
                  <div className="temp">  
                    <Stack gap={3}>
                      <h1 className="todayTemp">{Math.round(data.current.temp)}{unit}</h1>
                      <h2 className="maxmin">Max/Min: {Math.round(data.daily[0].temp.max)}{unit}/{Math.round(data.daily[0].temp.min)}{unit}</h2>                      
                      <h2 className="feelslike"><p>Feels like {data.current.feels_like.toFixed()}{unit}</p></h2>                    
                      </Stack>
                  </div>
                </Col>
              <Col>
                <div className="weatherinfo">
                  <h1 className="day">{new Date().toLocaleString("en", { weekday: "long" })}</h1>
                  <img src = {iconurl} className="cur-weather-icon"></img>
                  <h2 className="description"><p>{data.current.weather[0].description}</p></h2>
                </div>
              </Col>
            </Row>
          </div>


          <div className="indexes">
            <Row class="rounded">
                <Col>
                  <div className="index1">
                    <Stack gap={2}>
                      <div className="precipitation">
                        <p>Precipitation</p>
                        <ProgressBar now={barpop} label={`${barpop}%`}/>
                      </div>
                      <div className = "uvindex">
                        <p><div className="uvtitle">UV Index</div><div className="uvno">{baruv}</div></p>
                      </div>
                    </Stack>
                  </div>
                </Col>

                <Col>
                  <div className="index2">
                    <Stack gap={2}>
                      <div className = "humidity">
                        <p>Humidity</p>
                        <ProgressBar now={barhumidity} label={`${barhumidity}%`}/>
                      </div>
                      <div className = "windspeed">
                        <p><div className="windtitle">Wind speed</div><div className="windspeedno">{barwind} mph</div></p>
                      </div>
                    </Stack>
                  </div> 
                </Col>
            </Row> 
          </div>
        </div> 
        <div className="recommendations container-fluid fixed-center">
          <Row>
            {recommendation(data)}
          </Row>
        </div>
      </Container>
        <div id="displayforecast" className="container-fluid">
            <Row className="justify-content-center">
              { ReactHtmlParser (otherDayForecast)}
            </Row>
        </div>
    </div>
  );
}
export default DisplayData;