import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Home from './home'
import List from './list'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>1111</div>
        <Route path="/" exact component={Home} />
        <Route path="/list" component={List} />
      </BrowserRouter>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
