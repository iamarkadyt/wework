import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import Layout from './components/Layout'
import Navigation from './components/Navigation/Navigation'
import Greeter from './components/Greeter/Greeter'

class App extends Component {
  render() {
    return (
      <div className="App-container">
        <Provider store={store}>
          <Router basename="/">
            <React.Fragment>
              <Layout />
              <Navigation />
            </React.Fragment>
          </Router>
        </Provider>
        <Greeter />
      </div>
    );
  }
}

export default App;
