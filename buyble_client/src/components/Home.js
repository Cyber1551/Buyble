import React, { Component } from 'react';
import Client from '../client.js';
import { auth } from './auth.js';
import {Redirect} from 'react-router-dom'
import {PieGraph} from './PieGraph.js'

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
                    <p>Welcome to My Store!</p>

                    <input type="text" id="productNameTxt" placeholder="Product Name..." />
                    <input type="date" id="dateTxt" placeholder="Date..." />
                    <input type="number" id="quantityTxt" placeholder="Quantity..." />
                    <input type="number" id="priceTxt" placeholder="Price..." />
                    <button onClick={this.sendTestData}>Send</button>
                    <PieGraph/>
                    <button onClick={this.productList.bind(this)}>Go to Product List</button><br />
                </div>
            )
          }

        }

}
