import React, { Component } from 'react';
import Client from '../client.js';
import { auth } from './auth.js';
import {Redirect} from 'react-router-dom'
import {PieGraph} from './PieGraph.js'
import {ButtonGroup, Button} from 'react-bootstrap';
import {MDBContainer, MDBRow} from 'mdbreact';

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
                <div className="Home" style={{border:"2px solid #fff"}}>
                   
                    <MDBContainer className="justify-content-center" style={{border:"2px solid #fff"}}>
                    <MDBRow className="justify-content-center">
                        <p>Welcome to My Store!</p>
                    </MDBRow>
                        <MDBRow className="justify-content-center">
                            
                            <input type="text" id="productNameTxt" placeholder="Product Name..." />
                            <input type="date" id="dateTxt" placeholder="Date..." />
                            <input type="number" id="quantityTxt" placeholder="Quantity..." />
                            <input type="number" id="priceTxt" placeholder="Price..." />
                        </MDBRow>  
                        <MDBRow className="justify-content-center">        
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" onClick={this.sendTestData.bind(this)}>Send</Button>
                                <Button variant="secondary" onClick={this.productList.bind(this)}>Go to Product List</Button>
                            </ButtonGroup>
                        </MDBRow>
                        <MDBRow className="justify-content-center">  
                            <PieGraph/>
                        </MDBRow>
                    </MDBContainer>
                </div>
            )
          }

        }

}
