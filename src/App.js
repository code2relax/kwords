import React from 'react';

import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Main from './Main';
import Levels from './Levels';
import Stats from './Stats';
import Download from './Download';
import Tabletop from 'tabletop';

import './App.css';

class App extends React.Component {


  constructor(props) {
    super(props);
    //const words = localStorage.getItem("Places") || 0;
    // const places = [
    //   {word: "Oaxaca"},
    //   {word: "Reykjavík"},
    //   {word: "Gloucestershire"},
    //   {word: "Versailles"},
    //   {word: "Milngavie"},
    //   {word: "Guadalajara"},
    //   {word: "Maroochydore"},
    //   {word: "Albuquerque"},
    //   {word: " Xi’an"},
    //   {word: "Saguache"}
    // ]

    // if (!words) {
    //   localStorage.setItem("wordlists", JSON.stringify(["Places"]) );  
    //   localStorage.setItem("Places", JSON.stringify(places) );  
    // }

    this.downloadWords = this.downloadWords.bind(this);
   
  }

  downloadWords () {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1bclciJRaAnyBU4PduWsAB2qgBEYlmf0SEATnE-i9vsQ/edit?usp=sharing',
      callback: (googleData, ttop) => {
        localStorage.setItem("wordlists", JSON.stringify(ttop.foundSheetNames) );  
        ttop.foundSheetNames.map(v => { localStorage.setItem(v, JSON.stringify(ttop.models[v].elements))});
      },
      simpleSheet: false
    });
  }
  

  componentDidMount () {
    const lname = localStorage.getItem("wordlists");
    if (lname == undefined) {
      localStorage.setItem("wordlists", JSON.stringify([]) );  
    }
    this.downloadWords();
  }


  render() {
    return (

      <Switch>
      <Route path="/main" component={Main}>
      </Route>
      <Route path="/stats">
        <Stats />
      </Route>
      <Route path="/download" component={Download}>
        <Download />
      </Route>
      <Route path="/" >
        <Levels />
      </Route>
    </Switch>
      
    );
  }
}
export default App;
