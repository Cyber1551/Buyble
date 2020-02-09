import React, { Component } from 'react';
import Client from '../client.js';
import { auth } from './auth.js';
import { Redirect } from 'react-router-dom'
import PieGraph from './PieGraph.js'
import { NavMenu_LoggedIn } from './NavMenu_LoggedIn.js';
import { ButtonGroup, Button, Tab, Tabs } from 'react-bootstrap';
import { MDBContainer, MDBRow } from 'mdbreact';
import { ProductList } from './ProductList'
import { ListElement } from './ListElement.js';
export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetched: false,
            data: [],
            redirectProductList: false,
            names: ['Jake', 'Jon', 'Thruster']
        }
        console.log(this.state);
    }
    componentDidMount() {
        this.loadDataForPieGraph();
    }

    loadDataForPieGraph() {
        console.log("data loaded");
        let current = this;
        Client.SendToServer('POST', 'product_list', { "user": auth.getUsername() }, function (data) {
            console.log(data)
            current.setState({ data: data.res })
        });
        console.log(this.state.data.res);
    }
    productList() {
        console.log(this.state);
        this.setState({ redirectProductList: true })
    }


    render() {

        if (this.state.redirectProductList === true) {
            console.log("redirecting!");
            return (
                <Redirect to={{
                    pathname: '/productlist'
                }} />
            );
        }
        else {
            console.log(this.state.data);

            return (
                <div className="Home" style={{ border: "2px solid #fff" }}>
                    <NavMenu_LoggedIn />
                    <MDBContainer className="justify-content-center" style={{ border: "2px solid #fff" }}>
                        <MDBRow className="justify-content-center">
                            <p>Welcome, {auth.getUsername()}</p>
                        </MDBRow>

                        <MDBRow className="justify-content-center">
                            <Tabs defaultActiveKey="dashboard" transition={false} style={{ width: "100%", height: "100%" }}>
                                <Tab eventKey="dashboard" title="Dashboard" >
                                    <PieGraph data={this.state.data} />
                                </Tab>
                                <Tab eventKey="product" title="Products">
                                    <MDBRow className="justify-content-center">

                                        <input type="text" id="productNameTxt" placeholder="Product Name..." />
                                        <input type="number" id="quantityTxt" placeholder="Quantity..." />
                                        <input type="number" id="priceTxt" placeholder="Price..." />
                                        <Button variant="secondary" onClick={this.sendTestData.bind(this)}>Add</Button>
                                    </MDBRow>
                                     
                                    <ListElement home={this} data={this.state.data} />

                                </Tab>
                            </Tabs>
                        </MDBRow>
                        <MDBRow className="justify-content-center">


                        </MDBRow>
                    </MDBContainer>
                </div>
            )
        }

    }
    sendTestData() {
        let name = document.getElementById("productNameTxt").value;
        let quantity = document.getElementById("quantityTxt").value;
        let price = document.getElementById("priceTxt").value;
        let current = this;
        Client.SendToServer("POST", "insertData", { "user": auth.getUsername(), "name": name, "quantity": quantity, "price": price }, function (data) {
            console.log(data)
            current.loadDataForPieGraph();
        })
    }


}
