
import React, { useState, useEffect } from 'react'


const api = {
  key: '78df773f12b7a881922ece7f8e7871ee',
  base:'api.openweathermap.org/data/2.5/'

}


function App() {

  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState(new Date().toLocaleString())

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`http://${api.base}weather?q=${cityName}&appid=${api.key}&units=metric`)
      .then(res=> res.json() )
      .then(result => {
        setWeather(result);
        setCityName('');
        console.log(result)
      
      }).catch(err=>{
        console.log(err)
      })
    }
  }

useEffect(()=>{
  setInterval(()=>{
    setTime(new Date().toLocaleString());
  },1000)
})




return(

  <div className={(typeof weather.main != "undefined" )  ? ((weather.main.temp > 16 ) ? 'app warm' : 'app') : 'app' }>
    <main className='container'>
      <div className="search-box">
        <input type="text"
        className='search-bar'
        placeholder=" Search..."
        onChange= {e => setCityName(e.target.value)}
        value={cityName}
        onKeyPress={search}
        />
      </div>
        {(typeof weather.main != "undefined") ? (
            <div>
      <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{time}</div>
        
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}°c
        </div>
        <div className="weather">
          {weather.weather[0].main}
        </div>
      </div>
      </div>

        ) : (
          ''
        )
      }
    </main>
  </div>

)

}




export default App;
