import React from 'react';
import logo from './logo.svg';
import './App.css';

import Client from './client.js';




class App extends React.Component{
  constructor()
  {
    super();  
    
    Client.ConnectToServer();
    Client.SOCKET.on("connect", Client.OnConnect());
    Client.SOCKET.on("disconnect", Client.OnDisconnect());
    Client.SOCKET.on("data", Client.HandleData());
  }

  render()
  {
    return (
      <div className="App">
        <input type="text" id="productNameTxt" placeholder="Product Name..." />
        <input type="date" id="dateTxt" placeholder="Date..." />
        <input type="number" id="quantityTxt" placeholder="Quantity..." />
        <input type="number" id="priceTxt" placeholder="Price..." />
        <button onClick={this.sendTestData}>Send</button>
      </div>
    );
  }
  sendTestData()
  {
    let name = document.getElementById("productNameTxt").value;
    let date = document.getElementById("dateTxt").value;
    let quantity = document.getElementById("quantityTxt").value;
    let price = document.getElementById("priceTxt").value;
    Client.SendDataToServer({OP: "test", name: name, date: date, quantity: quantity, price: price});
  }
}



export default App;
