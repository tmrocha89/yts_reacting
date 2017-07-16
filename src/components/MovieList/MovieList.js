import React, { Component } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import request from 'request';
import { Col, Row } from 'antd';

function getMoviesElements (movies, showMax, MAX_TO_DISPLAY_PER_LINE){
  if(showMax > -1)
    movies = movies.slice(0, showMax);
  var rows = movies.map(function(movie, i) {
        return <Col span={4} key={i}> <Movie key={i} movie={movie} /> </Col>;
    }).reduce(function(r, element, index) {
        if(index % MAX_TO_DISPLAY_PER_LINE === 0){// [[elem1, elem2, ...], [elem3, ...], ...]
          r.push([]);
        }
        r[r.length - 1].push(element);
        return r;
    }, []);
    rows = rows.map(function(moviesRow, i){
      return <Row className="movieRow" gutter={MAX_TO_DISPLAY_PER_LINE * 4}>{moviesRow}</Row>;
    });
    return <div>{rows}</div>;
}
  
class MovieList extends Component {

  constructor(props){
    super(props);

    this.state = {
      movies: []
    }
  }

  componentWillMount(){
    let self = this;
    request.get({url: this.props.url, json:true}, function(err, response, body){
      if(body){
        self.setState({movies: body.data.movies});
      }
    })
  }

  render() {
    let movies = this.state.movies;
    let total = this.props.show || -1;
    let perLine = this.props.perLine || 4;
    let title = this.props.title || '';
    
    return (
      <div>
        <h2>{title}</h2>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          {getMoviesElements(movies, total, perLine)}
        </div>
      </div>
    );
  }
}
export default MovieList;
