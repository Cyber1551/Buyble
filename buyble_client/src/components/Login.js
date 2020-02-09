import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Client from '../client.js';
import {auth} from './auth.js';


export default class Login extends Component {
    state = {
        shouldRedirect: false,
      };
      constructor(props)
      {
        super(props);

      }

    render() {
        if (this.state.shouldRedirect) {
            return (
                <Redirect to='/' />
            )
        } else {
        return(
             <div className="Login">
                <p>Login!</p> 
                <input type="email" id="emailLogin" placeholder="Email..." /><br /> 
                <input type="password" id="passwordLogin" placeholder="Password..." /><br />
                <button onClick={this.onClickLogin.bind(this)}>Login</button>
            </div>
        )
          }
    }
    onClickLogin()
    {
        let current = this;
        auth.login(function(data)
        {
            console.log(current)
            current.setState({ shouldRedirect: true })
        })
        
    }


  
}
