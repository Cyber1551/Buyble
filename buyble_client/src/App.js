import React, { Component, useState } from 'react';
import { Route, Redirect} from 'react-router-dom';
//import PrivateRoute from './components/PrivateRoute';
import { Layout } from './components/Layout';
//import { Login } from './components/Login';
//import { Register } from './components/Register';
import { Home } from './components/Home';
import { Register } from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import {Dashboard} from './components/Dashboard';

export default class App extends Component {
  static displayName = App.name;
 
  render()
  {
    return (
      <Layout> 
        
        <PrivateRoute path='/' component={Home} component_fail={Login} />

      </Layout>

    );
  }
}

