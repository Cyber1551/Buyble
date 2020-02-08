import React, { Component } from 'react';
import Client from '../client.js';

export class Home extends Component {
    
    render() {
        return(
            <div className="Home">
                <p>Welcome to Buyble!</p>
                <input type="text" id="productNameTxt" placeholder="Product Name..." />
                <input type="date" id="dateTxt" placeholder="Date..." />
                <input type="number" id="quantityTxt" placeholder="Quantity..." />
                <input type="number" id="priceTxt" placeholder="Price..." />
                <button onClick={this.sendTestData}>Send</button>
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
