import React, { useState } from 'react';
import './App.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";


function App() {
  const [render, setRender] = useState({name: '', code: '', lat: '', lng: ''});

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
    let cities = await fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');
    let citiesJSON = await cities.json();

    let city = await citiesJSON[Math.floor(Math.random() * citiesJSON.length)];
    console.log(city);
    setRender({name: city.name, code: city.country, lat: deg_to_dms(city.lat, 'N'), lng: deg_to_dms(city.lng, 'E')})
  }

  return (
    <div className="App">
      <h1>Travel <span>roulette</span><i className="fas fa-route"></i></h1>
      <p>Click the button to retrieve one of the <span>128.769</span> cities available in our database and the Google Maps url for the city. Bon voyage!</p>
      <button onClick={clickMe}>Generate</button>
      <div className="go">Let's go to... { render.name && <><span className='hl'>{render.name}, {render.code}</span> <span class={`fi fi-${render.code.toLowerCase()}`}></span> </>}</div>
      <div><a href={`https://www.google.com/maps/place/${render.lat}+${render.lng}`} target="_blank">{render.name !== '' ? `Click to see the map` : ''}</a></div>
      <h6 className="ft">Dario Aladuz</h6>
    </div>
  );
}

export default App;

// console.log(cities[0][Math.floor(Math.random() * cities[0].length)].name)
