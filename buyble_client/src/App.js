import React from 'react';
import logo from './logo.svg';
import './App.css';

import Client from './client.js';

const socket = Client.ConnectToServer();


class App extends React.Component{
  constructor()
  {
    super();  
    socket.on("connect", Client.OnConnect());
    socket.on("disconnect", Client.OnDisconnect());
    socket.on("data", Client.HandleData());
  }

  render()
  {
    return (
      <div className="App">
        
      </div>
    );
  }
}



export default App;
