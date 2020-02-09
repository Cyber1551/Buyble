import React, { Component } from 'react';
import Client from '../client.js';
import { auth } from './auth.js';
import {Redirect} from 'react-router-dom'

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetched: false,
            redirectProductList: false,
            shouldRedirect: false
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
                    pathname:'./productlist'
                }}/>
            );
        }
        else {
          if (this.state.shouldRedirect)
          {
            return(
              <Redirect to='/' />
            )
          }
          else {
            return(
                <div className="Home">
                    <p>Welcome to My Store!</p>

                    <input type="text" id="productNameTxt" placeholder="Product Name..." />
                    <input type="date" id="dateTxt" placeholder="Date..." />
                    <input type="number" id="quantityTxt" placeholder="Quantity..." />
                    <input type="number" id="priceTxt" placeholder="Price..." />
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="mr-2" aria-label="First group">
                            <button onClick={this.sendTestData.bind(this)}>Send</button>
                            <button onClick={this.productList.bind(this)}>Go to Product List</button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    
                    <PieGraph/>
                    <button onClick={this.productList.bind(this)}>Go to Product List</button><br />
                    <button onClick={this.onClickLogout.bind(this)}>Logout</button>

                </div>
            )
          }

        }


    }
    onClickLogout()
    {
        auth.logout();
        this.setState({shouldRedirect: true})
    }
}
