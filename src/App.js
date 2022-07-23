import {Component} from 'react'

import {Route} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'

class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={Home} />
        <Route exact path="/restaurant/:id" component={RestaurantDetails} />
      </>
    )
  }
}

export default App
