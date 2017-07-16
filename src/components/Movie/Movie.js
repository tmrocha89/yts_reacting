import React, { Component } from 'react';
import './Movie.css'
import { Card } from 'antd';
import { Button, Menu, Dropdown, Icon } from 'antd';

var downloadTorrent = function(torrents, event){
    var torrent = torrents[event.key];
    window.open(torrent.url);
}

var torrentMenu;

function setTorrentMenu(movie){
    if(movie){
        torrentMenu = (<Menu onClick={downloadTorrent.bind(null, movie.torrents)}>
                            {movie.torrents.map(function(torrent,i){ return <Menu.Item key={i}><Icon type="download" /> {torrent.quality} ({torrent.size})</Menu.Item>})}
                        </Menu>);
    }
}

class Movie extends Component {

  render() {
    let movie = this.props.movie;
    let cover = movie ? movie.medium_cover_image : '';
    let title = movie ? movie.title : '';
    let longTitle = movie ? movie.title_long : '';
    if(longTitle.length > 18){
        longTitle = longTitle.substr(0,18)+"...";
    }
    let date = movie ? movie.date_uploaded : '';
    setTorrentMenu(movie);
    
    return (
        <Card className="card-style" bordered={false}>
            <div className="custom-image">
                <img alt={title} width="100%" src={cover} />
            </div>
            <div className="custom-card">
                <h3>{longTitle}</h3>
                <p>{date}</p>
                <p>
                    <Dropdown overlay={torrentMenu}>
                        <Button>
                            Torrents <Icon type="down" />
                        </Button>
                    </Dropdown>
                </p>
            </div>
        </Card>
    );
  }
}

export default Movie;
