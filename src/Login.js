import React, {Component} from 'react';
import './Login.css';
import PropTypes from 'prop-types';

class Login extends React.Component {

  /*Stato del componente login : aggiornati user e pass all'evento change dei due input */
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
/*Chiamata API di login che autorizza o meno l'utente*/
  loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
/* Al submit*/
   handleSubmit = async e => {
    e.preventDefault();
    const token = await this.loginUser(this.state.username);
    this.props.setToken(token);//Funzione chiamata dal suo passaggio del componente (richiamata con props.nomefunz)
  }

  render(){

  return(
  <div className="login-wrapper">
        <h1>Please Log In</h1>
        username vale {this.state.username}
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => this.setState({username : e.target.value})} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => this.setState({password : e.target.value})}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;