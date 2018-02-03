import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class Aggregate extends Component {
  render () {
    return (
      <div style={{width: '40%', display: 'inline-block'}}>
        <h2>Text: Number</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render () {
    return (
      <div>
        <img className="App-logo" src={logo}/>
        <input type="text"/>
      </div>
    )
  }
}

class Playlist extends Component {
  render () {
    return (
      <div style={{display: 'inline-block', padding: '10px'}}>
        <img/>
        <h3> Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    )
  }
}

class App extends Component {
  render () {
    let name = 'Daniel'
    return (
      <div className="App">
        <h1>Title of the page</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <div>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div>
      </div>
    )
  }
}

export default App
