import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav';
import { Card } from '../common';

export default class ArtistAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            tracks: []
        };
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    showAlbums = (albums) => {
        if(albums!=undefined){
            console.log('albums inside showAlbums',albums)
            let results = [];
            albums.map((album, index) => {
                if(album.images[0]!=undefined){
                    let hasImage = album.images[0];
                    results.push(
                        <div className="col-md-3">
                            <Card 
                                name={album.name}
                                id={album.id}
                                key={index}
                                imageURL={hasImage.url}
                                onClick={event => this.getAlbumTracks(event, album.id, album.name)}
                                text="Show Tracks"                                                     
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

    getAlbumTracks = (event, albumId, name) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;
        console.log('albumId',albumId);
        let tracks;
        let cleanName = name.replace(/[ ]/g,"-").replace(/[()]/g,"").trim();
        axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks?access_token=${authToken}`)
        .then(response => {
            console.log(response);
            this.setState({ tracks: response.data.items });
            tracks = response.data.items;            
        })
        .then(()=> this.props.history.push(
            `/album-tracks/${albumId}/${cleanName}`, 
            { 
                data: { tracks },
                current_user: { user: this.state.current_user.user },
                auth: { authToken }
            }
        ))
        .catch(error => console.log(error));
    }

    render() {
        console.log('this.props',this.props);
        const { data: { albums }, current_user: { user: { images, display_name } } } = this.props.location.state;
        return (
            <div>
                <Nav 
                    imageURL={images[0].url} 
                    display_name={display_name}
                    {...this.props} 
                />
                <div className="justify-content-center mt-5 row">
                    <p className="text-center display-5">
                        Album Results for { albums[0].artists[0].name}
                    </p>
                </div>
                <div className="row">
                    {this.showAlbums(albums)}
                </div>
            </div>
        )
    }
}
