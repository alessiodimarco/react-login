import './App.css';
import Dashboard from './Dashboard.js';
import Preferences from './Preferences.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './Login';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      token: "",
    };
  }

  /* Arrow function mantiene this come scope */
  setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken)); /* Local Storage : alla chiusura della tab, la sessione è ancora attiva */
    this.setState({ token: userToken }); /* State aggiornato : la pagina refresha */
  }

  getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token; /* Il punto interrogativo perchè all'inizio potrebbe essere undefined e creare errore*/
  }

  render(){
    console.log(this.getToken());
    if(!this.getToken()) {
      return <Login setToken={this.setToken}/> /* passaggio di funzione al componente*/
    }

  return (
    <div className="wrapper">
    <h1>Application</h1>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/preferences">
          <Preferences />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}
}

export default App;
