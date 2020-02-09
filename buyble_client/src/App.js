import React, { Component, useState } from 'react';
import { Route, Redirect} from 'react-router-dom';
//import PrivateRoute from './components/PrivateRoute';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { Home } from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import {Logout} from './components/Logout';
export default class App extends Component {
  static displayName = App.name;

  render()
  {
    return (
      <Layout>
        <PrivateRoute path='/'  component={Home} component_fail={Login} />
        <Route exact path='/Logout'  component={Logout} />
        <Route exact path='/ProductList' component={ProductList} />
      </Layout>

    );
  }

}
