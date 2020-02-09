import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBRow } from "mdbreact";
import { ButtonGroup, Button } from 'react-bootstrap';
import Client from '../client.js';
import { auth } from './auth.js';
import { ListElement } from './ListElement.js';
export class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetched: false,
            redirect: false,
            products: []
        }
    }
    render() {
        console.log (this.state.products)
        
        return (
            <div>
                <MDBRow className="justify-content-center">

                    <input type="text" id="productNameTxt" placeholder="Product Name..." />
                    <input type="number" id="quantityTxt" placeholder="Quantity..." />
                    <input type="number" id="priceTxt" placeholder="Price..." />
                    <Button variant="secondary" onClick={this.sendTestData.bind(this)}>Add</Button>
                </MDBRow>
                {this.state.products.forEach((name) => {
                    console.log(name.name)
                    return <ListElement value={name.name} />
                })}
               

            </div>


        )
    }
    sendTestData() {
        let name = document.getElementById("productNameTxt").value;
        let quantity = document.getElementById("quantityTxt").value;
        let price = document.getElementById("priceTxt").value;
        let current = this;
        Client.SendToServer("POST", "insertData", { "user": auth.getUsername(), "name": name, "quantity": quantity, "price": price }, function (data) {
            console.log(data)
            current.props.home.loadDataForPieGraph();
            current.updateData();
        })
    }



}