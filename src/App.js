import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

let fakeServerData = {
  user: {
    name: 'Daniel',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {
            name: 'Song 1',
            duration: 186
          }, {
            name: 'Song 2',
            duration: 229
          }, {
            name: 'Song 3',
            duration: 227
          }
        ]
      }, {
        name: 'Disco Playlist',
        songs: [
          {
            name: 'Disco Song 1',
            duration: 201
          }, {
            name: 'Disco Song 2',
            duration: 239
          }, {
            name: 'Disco Song 3',
            duration: 231
          }
        ]
      }, {
        name: 'Dubstep Playlist',
        songs: [
          {
            name: 'Dubstep Song 1',
            duration: 217
          }, {
            name: 'Dubstep Song 2',
            duration: 217
          }, {
            name: 'Dubstep Song 3',
            duration: 228
          }
        ]
      }, {
        name: 'Acoustic Playlist',
        songs: [
          {
            name: 'Acoustic Song 1',
            duration: 223
          }, {
            name: 'Acoustic Song 2',
            duration: 213
          }, {
            name: 'Acoustic Song 3',
            duration: 219
          }
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (<div style={{
        width: '40%',
        display: 'inline-block'
      }}>
      <h2>{this.props.playlists.length}</h2>
    </div>)
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, playlist) => {
      return songs.concat(playlist.songs)
    }, [])
    let totalDuration = allSongs.reduce((total, song) => {
      return total + song.duration
    }, 0)
    return (<div style={{
        width: '40%',
        display: 'inline-block'
      }}>
      <h2>{totalDuration}
        &nbsp;seconds</h2>
    </div>)
  }
}

class Filter extends Component {
  render() {
    return (<div>
      <img className="App-logo" src={logo}/>
      <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
    </div>)
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (<div style={{
        display: 'inline-block',
        padding: '10px'
      }}>
      <img/>
      <h3>{playlist.name}</h3>
      <ul>
        {playlist.songs.map(song => <li>{song.name}</li>)}
      </ul>
    </div>)
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let userId,
      apiCalls = [];
    let accessToken = new URLSearchParams(window.location.search).get('access_token');
    let serverData = {
      user: {
        name: '',
        playlists: []
      }
    };

    // Get user details.
    apiCalls.push(fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json()).then(data => {
      serverData.user.name = data.display_name;
      userId = data.id;
    }));

    // Get user playlists..
    apiCalls.push(fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json()).then(data => {
      console.log(data);
    }));

    /**
    * CONTINUE TO GET THE PLAYLIST DATA
    */
  }

  render() {
    let filteredPlaylist = this.state.serverData.user && this.state.serverData.playlists
      ? this.state.serverData.user.playlists.filter(playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
      : []
    return (<div className="App">
      {
        this.state.serverData.user
          ? <div>
              <h1>{this.state.serverData.user && this.state.serverData.user.name}'s playlist</h1>
              < PlaylistCounter playlists={filteredPlaylist}/>
              <HoursCounter playlists={filteredPlaylist}/>
              <Filter onTextChange={text => this.setState({filterString: text})}/>
              <div>
                {filteredPlaylist.map(playlist => <Playlist playlist={playlist}/>)}
              </div>
            </div>
          : <button onClick={() => window.location = 'http://localhost:8888/login'} style={{
              padding: '20px',
              'font-size' : '25px',
              'margin-top' : '20px'
            }}>Sign in with Spotify</button>
      }
      </div>)
  }
}

export default App
