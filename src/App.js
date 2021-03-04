import React, { useState } from 'react';
import './App.css';
import useFetch from './useFetch';


function App() {

  let cities = useFetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');

  const [render, setRender] = useState({name: '', code: '', lat: '', lng: ''});

  let Icon = () => {
    return (
    <div>
      <p>xxx</p>
    </div>
    )
  }
 
  setTimeout(() => {
    console.log(cities[0])
  }, 1500)
  function deg_to_dms (deg, dir) {
    if (deg < 0) {
      deg = deg * -1;
      dir = dir == 'N' ? 'S' : 'W';
    }
    var d = Math.floor (deg);
    var minfloat = (deg-d)*60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat-m)*60;
    var s = Math.round(secfloat);
    // After rounding, the seconds might become 60. These two
    // if-tests are not necessary if no rounding is done.
    if (s==60) {
      m++;
      s=0;
    }
    if (m==60) {
      d++;
      m=0;
    }
    return (`${d}º${m}'${s}"${dir}`);
 }

  function clickMe() {
    let city = cities[0][Math.floor(Math.random() * cities[0].length)];
    setRender({name: city.name, code: city.country, lat: deg_to_dms(city.lat, 'N'), lng: deg_to_dms(city.lng, 'E')})

    console.log(render);

  }

  return (
    <div className="App">
      <h1>Travel <span>roulette</span><i className="fas fa-route"></i></h1>
      <p>Dale al botón para generar aleatoriamente una de las <span>128.769</span> ciudades disponibles en nuestra base de datos y un enlace al mapa de la ciudad generada. Bon voyage!</p>
      <button onClick={clickMe}>Generar</button>
      <div className="go">Vámonos a... <span class='hl'>{render.name}, {render.code}</span></div>
      <div><a href={`https://www.google.com/maps/place/${render.lat}+${render.lng}`} target="_blank">{render.name !== '' ? `Click para ver el mapa` : ''}</a></div>
      <h6 className="ft">Dario Aladuz</h6>
    </div>
  );
}

export default App;

// console.log(cities[0][Math.floor(Math.random() * cities[0].length)].name)
