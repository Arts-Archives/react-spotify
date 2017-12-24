import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';
import { Card } from '../common';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            query: '',
            artists: []
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

    componentWillReceiveProps = (nextProps) => {
      console.log('cwp ran', nextProps)
    }
    

    captureSearch = (searchTerm) => {
        this.setState({ query: searchTerm })
    }

    searchSpotifyArtists = (event) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;
        console.log('query',this.state.query);
        let artists;
        axios.get(`https://api.spotify.com/v1/search?q=${this.state.query}&type=artist&access_token=${authToken}`)
        .then(response => {
            artists = response.data.artists;
            this.setState({artists});
        })
        .catch(error => console.log(error))

    }
    
    showArtistResults = (artists) => {
        if(artists!=undefined){
            console.log('artists inside showArtists',artists)
            let results = [];
            artists.map((artist, index) => {
                if(artist.images[0]!=undefined){
                    console.log(artist.images[0]);
                    let hasImage = artist.images[0];
                    results.push(
                        <div className="col-md-3">
                            <Card 
                                name={artist.name}
                                id={artist.id}
                                key={index}
                                imageURL={hasImage.url}
                                onClick={(event) => this.searchAlbums(event,artist.id)}                                                     
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

    searchAlbums = (event, artistId) => {
        event.preventDefault();
        console.log('artistId',artistId)
    }

    render() {
        console.log('this.props in profile', this.props);
        console.log('this.state in profile', this.state);
        const { images, display_name } = this.props.location.state.current_user.user;
        return <div>
            <Nav imageURL={images[0].url} onChange={event => this.captureSearch(event.target.value)} display_name={display_name} />
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
                        onChange={event => this.captureSearch(event.target.value)}
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
                </form>
              </div>
            </div>
            <div className="row">
                {this.showArtistResults(this.state.artists.items)}
            </div>
          </div>;            
    }
}