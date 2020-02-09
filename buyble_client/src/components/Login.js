import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Client from '../client.js';
import {auth} from './auth.js';
import {NavMenu} from './NavMenu'


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
            <table>
                <tr> 
                    <td>
                        <div className="Login">
                        <NavMenu />
                        <p>Login!</p> 
                        <input type="email" id="emailLogin" placeholder="Email..." /><br /> 
                        <input type="password" id="passwordLogin" placeholder="Password..." /><br />
                        <button onClick={this.onClickLogin.bind(this)}>Login</button><br /><br />
                        <p id="notTxt"></p>
                        </div>
                    </td>
                    <td>
                    <div className="Register">
                        <p>Register!</p> 
                    <input type="email" id="emailRegister" placeholder="Email..." /><br /> 
                    <input type="text" id="storeNameRegister" placeholder="Store Name..." /><br />
                    <input type="password" id="passwordRegister" placeholder="Password..." /><br />
                    <input type="password" id="repeatPasswordRegister" placeholder="Repeat Password..." /><br />
                    <button onClick={this.onClickRegister}>Register</button><br />
             <p id="notTxt"></p>
         </div>
                    </td>
                </tr>
            </table>
            
            
        )
          }
    }
    onClickLogin()
    {
        let email = document.getElementById("emailLogin").value;
        let password = document.getElementById("passwordLogin").value;
        let current = this;
        auth.login({"email": email, "password": password}, function(data)
        {
            if (data.res)
            {
                current.setState({ shouldRedirect: true }) 
            }
            else
            {   
                document.getElementById("notTxt").innerText = data.info;
            }
            
        })
        
    }


  
}
