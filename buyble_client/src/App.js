import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RemindersDashboard } from './components/Reminders/ReminderDashboard';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/reminders' component={RemindersDashboard} />
      </Layout>

    );
  }
}