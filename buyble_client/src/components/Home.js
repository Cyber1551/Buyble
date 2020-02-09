import React, { Component } from 'react';
import Client from '../client.js';
import { auth } from './auth.js';
import {Redirect} from 'react-router-dom'

export class Home extends Component {
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
            <div className="Home">
                <p>Welcome to Buyble!</p>
                <input type="text" id="productNameTxt" placeholder="Product Name..." />
                <input type="date" id="dateTxt" placeholder="Date..." />
                <input type="number" id="quantityTxt" placeholder="Quantity..." />
                <input type="number" id="priceTxt" placeholder="Price..." />
                <button onClick={this.sendTestData}>Send</button>
                <button onClick={this.onClickLogout.bind(this)}>Logout</button>
            </div>
        )
        }
    }
    onClickLogout()
    {
        auth.logout(); 
        this.setState({shouldRedirect: true})
    }
}
