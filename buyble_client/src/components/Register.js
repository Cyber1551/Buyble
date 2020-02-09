import React, { Component } from 'react';
import Client from '../client.js';

export class Register extends Component {
    
    render() {
        return(
            <div className="Register">
                <p>Register!</p> 
                <input type="email" id="emailRegister" placeholder="Email..." /><br /> 
                <input type="text" id="storeNameRegister" placeholder="Store Name..." /><br />
                <input type="password" id="passwordRegister" placeholder="Password..." /><br />
                <input type="password" id="repeatPasswordRegister" placeholder="Repeat Password..." /><br />
                <button onClick={this.onClickRegister}>Register</button><br />
                <p id="notTxt"></p>
            </div>
        )
    }
    onClickRegister()
    {
        let email = document.getElementById("emailRegister").value;
        let storeName = document.getElementById("storeNameRegister").value;
        let password = document.getElementById("passwordRegister").value;
        let passwordR = document.getElementById("repeatPasswordRegister").value;
        if (password !== passwordR)
        {
            document.getElementById("notTxt").innerText = "Password don't match";
        }
        else
        {
            Client.SendToServer("POST", "register", {email: email, store: storeName, password: password}, function(data) {
                if (data.info !== undefined)
                {
                    document.getElementById("notTxt").innerText = data.info;
                }
                else
                {
                    document.getElementById("notTxt").innerText = "SUCCESS";
                }
                
            })
        }
        
    }
}
