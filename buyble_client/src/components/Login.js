import React, { Component } from 'react';
import Client from '../client.js';

export class Login extends Component {
    
    render() {
        return(
            <div className="Register">
                <p>Register!</p> 
                <input type="email" id="emailLogin" placeholder="Email..." /><br /> 
                <input type="password" id="passwordLogin" placeholder="Password..." /><br />
                <button onClick={this.onClickLogin}>Login</button>
            </div>
        )
    }
    sendTestData()
    {
        Client.SendToServer("POST", "product_list", null, function(data) {
            console.log(data)
        })
    }
}
