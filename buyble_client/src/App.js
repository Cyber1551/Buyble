import React from 'react';
import logo from './logo.svg';
import './App.css';
import Client from './client.js';



class App extends React.Component{

  constructor()
  {
    super();

  }
  render()
  {
    return (
      <div className="App">
        <input type="text" id="productNameTxt" placeholder="Product Name..." />
        <input type="date" id="dateTxt" placeholder="Date..." />
        <input type="number" id="quantityTxt" placeholder="Quantity..." />
        <input type="number" id="priceTxt" placeholder="Price..." />
        <button onClick={this.sendTestData}>Send</button><br /><br /> 
        <input type="text" id="searchText" placeholder="Search For Product..." />
        <button onClick={this.searchData}>Search</button><p id="resultTxt"></p>
      </div>
    );
  }
  sendTestData()
  {
    let name = document.getElementById("productNameTxt").value;
    let date = document.getElementById("dateTxt").value;
    let quantity = document.getElementById("quantityTxt").value;
    let price = document.getElementById("priceTxt").value;
    Client.SendToServer("post", "insertData", {name: name, date: date, quantity: quantity, price: price}, function (data) {
      if (data.info != undefined)
      {
        
        document.getElementById("resultTxt").innerText = data.info;
      }
      else
      {
        document.getElementById("resultTxt").innerText = "SUCCESS"
      }
    });
  }
  searchData()
  {
    let txt = document.getElementById("searchText").value;
    Client.SendToServer("get", `product/${txt}`, null, function (data) {
      
      console.log(data)
      if (data.res != undefined)
      {
        document.getElementById("resultTxt").innerText = data.info;
      }
      else
      {
        document.getElementById("resultTxt").innerText = `There are #${data.quantity} ${data.product} that costs ${data.price} on date ${data.date}`;
      }

      
    })
  }
}



export default App;
