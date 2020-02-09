import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
export class ProductList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            fetched: false,
            redirect: false,
        }
    }
    render(){
        console.log("Product list hit");
        return(
            <MDBContainer className="justify-content-center">
                <h1>Does this show?</h1>
                <MDBListGroup style={{ width: "22rem" }}>
                <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
                <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
                <MDBListGroupItem>Morbi leo risus</MDBListGroupItem>
                <MDBListGroupItem>Porta ac consectetur ac</MDBListGroupItem>
                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
                </MDBListGroup>
            </MDBContainer>
        )
    }
}