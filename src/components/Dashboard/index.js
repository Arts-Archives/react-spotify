import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';
import { Card } from '../common';
import { spotifySearchURL, spotifyArtistURL } from '../../constants';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            query: '',
            artists: [],
            albums: [],
            error: ''
        }        
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    captureSearch = (searchTerm) => {
        this.setState({ query: searchTerm })
    }

    searchSpotifyArtists = (event) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;        
        let artists;
        axios.get(`${spotifySearchURL}${this.state.query}&type=artist&access_token=${authToken}`)
        .then(response => {
            artists = response.data.artists;
            this.setState({artists, error: ''});
        })
        .catch(error => {
            this.setState({ 
                error: 'Sorry your search didn\'t return any results...'
            })
        })

    }
    
    showArtistResults = (artists) => {
        if(artists!=undefined){            
            let results = [];
            artists.map((artist, index) => {
                if(artist.images[0]!=undefined){
                    let hasImage = artist.images[0];
                    results.push(
                        <div className="col-md-3">
                            <Card 
                                name={artist.name}
                                id={artist.id}
                                key={index}
                                imageURL={hasImage.url}
                                onClick={(event) => this.searchAlbums(event,artist.id, artist.name)}
                                text="Show Albums"                                                     
                            />
                        </div>
                    )
                }             
            })
            return results
        }else{
            return <p></p>
        }
    }

    searchAlbums = (event, artistId, name) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;        
        let albums;
        let cleanName = name.replace(/[ ]/g,"-").replace(/[()]/g,"").trim();
        axios.get(`${spotifyArtistURL}${artistId}/albums?album_type=album&access_token=${authToken}`)
        .then(response => {            
            this.setState({ albums: response.data.items });
            albums = response.data.items;            
        })
        .then(()=> this.props.history.push(
            `/artist-albums/${artistId}/${cleanName}`, 
            { 
                data: { albums },
                current_user: { user: this.state.current_user.user },
                auth: { authToken }
            }
        ))
        .catch(error => console.log(error));
    }

    render() {
        const { images, display_name } = this.props.location.state.current_user.user;
        return <div>
            <Nav 
                imageURL={images[0].url} 
                display_name={display_name}
                {...this.props}
            />
            <div className="row mt-5">
              <div className="col-lg">
                <p className="lead text-center">Search Artists</p>
              </div>
            </div>
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-6">
                <form onSubmit={this.searchSpotifyArtists} className="text-center">
                  <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control text-center" 
                        placeholder="enter artist name" 
                        onChange={
                            event => {
                                this.captureSearch(event.target.value)
                                this.setState({ error: ''})
                            }
                        }
                        value={this.state.query} 
                    />
                  </div>
                  <div className="form-group">
                    <button 
                        className="btn btn-outline-success" 
                        type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="form-group">
                    <p style={{color: '#e74c3c'}}>
                        {this.state.error}
                    </p>
                </div>
                </form>
              </div>
            </div>
            <div className="row">
                {this.showArtistResults(this.state.artists.items)}
            </div>
          </div>;            
    }
}