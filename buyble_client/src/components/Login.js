import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Client from '../client.js';
import { auth } from './auth.js';
import { NavMenu } from './NavMenu'
import { ButtonGroup, Button } from 'react-bootstrap';

export default class Login extends Component {
    state = {
        shouldRedirect: false,
    };
    constructor(props) {
        super(props);

    }

    render() {
        if (this.state.shouldRedirect) {
            return (
                <Redirect to='/' />
            )
        } else {
            return (

                <div className="Login">
                    <NavMenu />
                    <div style={{float: "left", marginLeft: "15%", marginTop: "25px"}}>
                        <p>Login!</p>
                        <input type="email" id="emailLogin" placeholder="Email..." size="30"/><br />
                        <input type="password" id="passwordLogin" placeholder="Password..." size="30"/><br />
                        <button onClick={this.onClickLogin.bind(this)}>Login</button>
                    </div>
                    <div style={{float: "right", marginRight: "15%", marginTop: "25px"}}>
                        <p>Register!</p>
                        <input type="email" id="emailRegister" placeholder="Email..."  size="30"/><br />
                        <input type="text" id="storeNameRegister" placeholder="Store Name..." size="30"/><br />
                        <input type="password" id="passwordRegister" placeholder="Password..." size="30"/><br />
                        <input type="password" id="repeatPasswordRegister" placeholder="Repeat Password..." size="30"/><br />
                        <button onClick={this.onClickRegister}>Register</button><br />
                    </div>

                    <p id="notTxt"></p>
                </div>



            )
        }
    }
    onClickLogin() {
        let email = document.getElementById("emailLogin").value;
        let password = document.getElementById("passwordLogin").value;
        let current = this;
        auth.login({ "email": email, "password": password }, function (data) {
            if (data.res) {
                current.setState({ shouldRedirect: true })
            }
            else {
                document.getElementById("notTxt").innerText = data.info;
            }

        })

    }
    onClickRegister() {
        let email = document.getElementById("emailRegister").value;
        let storeName = document.getElementById("storeNameRegister").value;
        let password = document.getElementById("passwordRegister").value;
        let passwordR = document.getElementById("repeatPasswordRegister").value;
        if (password !== passwordR) {
            document.getElementById("notTxt").innerText = "Password don't match";
        }
        else {
            Client.SendToServer("POST", "register", { email: email, store: storeName, password: password }, function (data) {
                if (data.info !== undefined) {
                    document.getElementById("notTxt").innerText = data.info;
                }
                else {
                    document.getElementById("notTxt").innerText = "SUCCESS";
                }

            })
        }

    }



}
