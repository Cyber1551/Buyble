import React from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';
import { Layout } from './components/Layout';
import Client from './client.js';


export default class App extends React.Component{

  /*constructor()
  {
    super();
    Client.SendToServer("post", "connection", "");
    Client.SendToServer("get", "product/pie")
  }*/
  render()
  {
    return (
      
      <Layout>
        <Route exact path='/' component={Home} />
        
      </Layout>
    );
  }
  /*sendTestData()
  {
    let name = document.getElementById("productNameTxt").value;
    let date = document.getElementById("dateTxt").value;
    let quantity = document.getElementById("quantityTxt").value;
    let price = document.getElementById("priceTxt").value;
    Client.SendToServer("post", "insertData", {name: name, date: date, quantity: quantity, price: price}, function (data) {
      console.log(data)
    });
  }*/
}



//export default App;
