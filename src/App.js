import React,{useState} from 'react'
import axios from 'axios'
import './App.css';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CloudIcon from '@material-ui/icons/Cloud';
import SearchIcon from '@material-ui/icons/Search'
const api = {
  key:"0b25eff4a8cb835a04881cd093daf391"
}

function App() {
  const [query,setQuery] = useState('')
  const [weather,setWeather] = useState({})
  const [err,setErr] = useState(false)

  const search = e =>{
    if(e.key === 'Enter'){
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(result=>{
        setErr(false)
        setWeather(result.data)
        setQuery('')
      })
      .catch(err=>{
        console.log(err)
        setErr(true)
        setWeather({})
      })
    }
  }

  let date = String(new window.Date())
  date = date.slice(3,15)

  return (
    <div className="app">
      <main>
        <div className="searchbox">
            <SearchIcon className="search__icon"/>
            <input
             type="text" 
             placeholder="Search...."
             value={query}
             onChange={(e)=>setQuery(e.target.value)}
             onKeyPress={search}
            />
        </div>
        {typeof weather.main != "undefined" && (
          <div className="weather__info">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="weather__date">{date}</div>
              <div className="weather__box">
              <div className="weather__degree">{Math.round(weather.main.temp)}℃</div>
              </div>
              <div className="weather__status">
                {weather.weather[0].main === "Clouds" || weather.weather[0].main === "Rain" || weather.weather[0].main === "Mist" || weather.weather[0].main === "Haze"? (<CloudIcon/>):(<WbSunnyIcon/>)} {weather.weather[0].main}
              </div>
          </div>
        )}
        {err && (
          <div className="error">
              <div className="err__box">
                 OOPS!!! No Cities Found :((
              </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
