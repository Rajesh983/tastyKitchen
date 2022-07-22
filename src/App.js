import {Component} from 'react'

import {Route} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={Home} />
      </>
    )
  }
}

export default App
