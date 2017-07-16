import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from './components/MovieList/MovieList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <MovieList title="More Downloaded" url="https://yts.ag/api/v2/list_movies.json?sort_by=download_count&order_by=desc" show={4} />
          <MovieList title="Recent Added" url="https://yts.ag/api/v2/list_movies.json" show={12} perLine={6} />
        </p>
      </div>
    );
  }
}

export default App;