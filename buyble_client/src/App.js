import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import PrivateRoute from './components/PrivateRoute';
import { Layout } from './components/Layout';
//import { Login } from './components/Login';
//import { Register } from './components/Register';
import { Home } from './components/Home';
import { Register } from './components/Register';
import {Login} from './components/Login';



export default class App extends Component {
  static displayName = App.name;

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
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Register' component={Register} />
      </Layout>

    );
  }
}
