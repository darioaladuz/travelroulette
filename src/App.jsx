import { useState } from 'react';
import './App.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Map from './components/Map';
import { RotatingLines } from 'react-loader-spinner';
import ThemeToggle from './components/ThemeToggle';


function App() {
  const [render, setRender] = useState({name: '', code: '', lat: '', lng: ''});
  const [showMap, setShowMap] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const themes = {
    dark: {
      "--background": "#000",
      "--text": "#ddd",
      "--main": "#646cff",
      "--anchor-hover": "#535bf2",
      "--button": "#2a2a2a",
      "--color-toggle-light": "yellow"
    },
    light: {
      "--background": "#fff",
      "--text": "#213547",
      "--main": "#646cff",
      "--anchor-hover": "#535bf2",
      "--button": "#f9f9f9"
    }
  }

  function deg_to_dms (deg, dir) {
    if (deg < 0) {
      deg = deg * -1;
      dir = dir === 'N' ? 'S' : 'W';
    }
    var d = Math.floor (deg);
    var minfloat = (deg-d)*60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat-m)*60;
    var s = Math.round(secfloat);
    // After rounding, the seconds might become 60. These two
    // if-tests are not necessary if no rounding is done.
    if (s === 60) {
      m++;
      s=0;
    }
    if (m === 60) {
      d++;
      m=0;
    }
    return (`${d}º${m}'${s}"${dir}`);
 }

  async function clickMe() {
    setShowMap(false);
    setMapLoading(true);
    let cities = await fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');
    let citiesJSON = await cities.json();

    let city = await citiesJSON[Math.floor(Math.random() * citiesJSON.length)];
    console.log(city);
    setRender({name: city.name, code: city.country, lat: deg_to_dms(city.lat, 'N'), lng: deg_to_dms(city.lng, 'E'), map: { lat: city.lat, lng: city.lng}});
    setMapLoading(false);
    setShowMap(true);
  }

  return (
    <div style={themes[theme]} className="App">
      <ThemeToggle
          isDark={theme === 'dark'}
          invertedIconLogic
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          // onChange={() => setDark((prev) => !prev)}
        />
      <h1>Travel <span style={{ color: "var(--main)" }}>Roulette</span> <i className="fas fa-route"></i></h1>
      <p>Click the button to retrieve one of the <span>128.769</span> cities available in our database and the Google Maps url for the city. Bon voyage!</p>
      <button onClick={clickMe}>Generate</button>
      <div className="go">Let&apos;s go to... { render.name && <><span className='hl' style={{ fontWeight: "900" }}>{render.name}, {render.code}</span> <span className={`fi fi-${render.code.toLowerCase()}`}></span> </>}</div>
      <div><a href={`https://www.google.com/maps/place/${render.lat}+${render.lng}`} rel="noreferrer" target="_blank">{render.name !== '' ? `See in Google Maps` : ''}</a></div>
      <div className="map">
      {
        mapLoading &&
        <RotatingLines
          strokeColor={themes[theme]["--main"]}
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      }
      { showMap && 
      <Map lat={ render.map.lat } lng={ render.map.lng } />}
      </div>
      <footer><a href="https://www.darioaladuz.com">Dario Aladuz</a> &copy; 2023</footer>
    </div>
  );
}

export default App;