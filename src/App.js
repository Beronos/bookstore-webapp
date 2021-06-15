import React, { Component, Fragment } from 'react';
import AuthorsTable from './Components/AuthorsTable';
import BooksTable from './Components/BooksTable';
import CreateBook from './Components/CreateBook';
import Navbar from './Components/Navbar';
import Login from './Components/LoginComponent';
import Logout from './Components/LogoutComponent'
import LoansTable from './Components/LoansTable';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/admin" component={Login} exact/>
            <Fragment>
              <Navbar />
              <Route path="/books" component={BooksTable} exact/>
              <Route path="/authors" component={AuthorsTable} exact/>
              <Route path="/books/create" component={CreateBook} exact/>
              <Route path="/logout" component={Logout} exact/>
              <Route path="/loans" component={LoansTable} exact/>
            </Fragment>
          </Switch>
        </div>
      </Router>
      </div>
      )
    
  }
}

export default App;
