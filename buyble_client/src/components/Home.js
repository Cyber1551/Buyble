import React, { Component } from 'react';
import Client from '../client.js';
import { auth } from './auth.js';
import {Redirect} from 'react-router-dom'
import {PieGraph} from './PieGraph.js'
import ButtonToolbar from 'bootstrap' 
import ButtonGroup from 'bootstrap'
import { NavMenu } from './NavMenu';
import { NavMenu_LoggedIn } from './NavMenu_LoggedIn.js';
export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetched: false,
            redirectProductList: false,
        }
        console.log(this.state);
    }

    productList() {
        console.log(this.state);
        this.setState({redirectProductList: true})
    }

    sendTestData()
    {
        Client.SendToServer("POST", "product_list", null, function(data) {
            console.log(data)
        })
    }

    render() {
        
        if (this.state.redirectProductList === true) {
            console.log("redirecting!");
            return (
                <Redirect to={{
                    pathname:'/productlist'
                }}/>
            );
        }
        else {
            return(

                <div className="Home">
                    <NavMenu_LoggedIn />
                    <p>Welcome to My Store!</p>

                    <input type="text" id="productNameTxt" placeholder="Product Name..." />
                    <input type="date" id="dateTxt" placeholder="Date..." />
                    <input type="number" id="quantityTxt" placeholder="Quantity..." />
                    <input type="number" id="priceTxt" placeholder="Price..." />
                    <button onClick={this.sendTestData.bind(this)}>Send</button>
                    <button onClick={this.productList.bind(this)}>Go to Product List</button>
         
                    
                    <PieGraph/>
                    <button onClick={this.productList.bind(this)}>Go to Product List</button><br />
                </div>
            )
          }

        }

}
