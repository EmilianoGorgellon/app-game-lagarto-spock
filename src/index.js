import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import logo from './images/logo-bonus.svg'
import piedra from './images/icon-rock.svg';
import papel from './images/icon-paper.svg';
import tijera from './images/icon-scissors.svg';
import lagarto from './images/icon-lizard.svg';
import spock from './images/icon-spock.svg';
import imgRules from './images/image-rules-bonus.svg';
import imgClose from './images/icon-close.svg';

const App = () => {
  const [mensaje, setMensaje] = useState([""]);
  const [namePC, setNamePC] = useState([]);
  const [imagePC, setImagePC] = useState([]);
  let [score, setScore] = useState(0);
  let [booleano, setBooleano] = useState(false);
  let [rules, setRules] = useState(false)
  const imagenes = [
    {"src": piedra, "id": 0, "name":"piedra"},
    {"src":tijera, "id": 1, "name":"tijera"},
    {"src":papel, "id": 2, "name":"papel"},
    {"src":lagarto, "id": 3, "name":"lagarto"},
    {"src":spock, "id": 4, "name":"spock"} 
  ];

  const Button = (e) => {
    let j1 = parseInt(e.target.id);
    let dataName = e.currentTarget.dataset.name;
    let j2 = parseInt(Math.floor(Math.random() * imagenes.length));
    let imgPC = imagenes.filter((datos) => datos.id === j2).map((datos) => datos.src);
    let namePC = imagenes.filter((datos) => datos.id === j2).map((datos) => datos.name)
    setImagePC(imgPC);
    setNamePC(namePC);
    const Eligio = () => {
      for (let datos of imagenes) {
        if (datos.name === dataName){
          document.getElementById(datos.name).classList.remove("invisible")
          document.getElementById(datos.name).classList.add("container--image-choice")
          document.getElementById(datos.name).classList.remove("container-images")
          // document.getElementById("title").classList.remove("invisible")
          setBooleano(true)
        } else {
          document.getElementById(datos.name).classList.remove("container--image-choice")
          document.getElementById(datos.name).classList.add("container-images")
          document.getElementById(datos.name).classList.add("invisible")
          // document.getElementById("title").classList.add("invisible")
        }
      }
    }
    Eligio()
    // Condiciones del juego
    if (j1 === j2){
      setMensaje("TIE")
    } else if ((j1 === 0 && j2 === 1) || (j1 === 0 && j2 === 3) || (j1 === 1 && j2 === 3) || (j1 === 1 && j2 === 2) || (j1 === 2 && j2 === 0) || (j1 === 2 && j2 === 4) || (j1 === 3 && j2 === 2) || (j1 === 3 && j2 === 4) || (j1 === 4 && j2 === 0) || (j1 === 4 && j2 === 1)){
      let resultado = score + 1;
      setScore(resultado);
      setMensaje("YOU WIN");
    } else {
      let resultado = score - 1;
      setScore(resultado)
      setMensaje("YOU LOSE");
    }
  }
  const ButtonAgain = () => {
    for (let dato of imagenes) {
      setBooleano(false)
      if (booleano){
        document.getElementById(dato.name).classList.remove("container--image-choice")
        document.getElementById(dato.name).classList.remove("invisible")
        document.getElementById(dato.name).classList.add("container-images")
      }
    }
  }

  const Rules = () => {
    rules ? setRules(false) : setRules(true);
  }

  return (
    <div className="container">
      <header className="container--header">
        <img className="header-img" src={logo} alt="logo" />
        <div className="container-score">
          <h1 className="header-title">SCORE</h1>
          <p className="header-score">{score}</p>
        </div>
      </header>
      <main className={booleano ? null : "main"}>
        {imagenes.map((dato, i) => 
        <div key={i} className={booleano ? `container-images img-${dato.name}` : `container-images img-${dato.name}`} id={dato.name}>
          <div className={booleano ? `container-images img-${dato.name} img--choice-player` : null }>
           <img className="global-img" src={dato.src} id={dato.id} data-name={dato.name} onClick={booleano ? null : Button} alt={`${dato.name}-player`} />
          </div>
          {booleano ?
            <>
              <h3 className="title-img-player">YOU PICKED</h3>
              <div className="container--result-msj-button">
                <h3 className="msj-resultado">{mensaje}</h3>
                <button className="button--play-again" onClick={ButtonAgain} data-name={dato.name}>PLAY AGAIN</button>
              </div>  
                <h2 className="title-img-pc">THE HOUSE PICKED: </h2>
                <div className={`container-images img-${namePC} container--maquina-img`} id={dato.name}>
                  <img src={imagePC} className="global-img" id={dato.id} data-name={dato.name} alt={`${dato.name}-PC`} />
                </div>

            </>
          : null }
        </div>
        )}
      </main>
      <footer>
        <button className="button-rules" onClick={Rules}>Rules</button>
        {rules ?
          <div className="container-rules">
            <h5 className="title-rules">RULES<img className="img-close" src={imgClose} alt="img-close" onClick={Rules} /></h5> 
            <img className="img-rules" src={imgRules} alt="Rules-game"/> 
          </div>
        : null}
      </footer>
    </div>
   
  )
}
ReactDOM.render(<App />, document.getElementById("root"))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
