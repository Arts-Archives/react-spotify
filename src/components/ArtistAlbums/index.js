import React, { Component } from 'react';
import Nav from '../Nav';
import { Card } from '../common';

export default class ArtistAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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
                                onClick={(event) => {event.preventDefault();console.log('clicked')}}
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

    render() {
        console.log('this.props',this.props);
        const { images, display_name } = this.props.location.state.current_user.user;
        return (
            <div>
                <Nav imageURL={images[0].url} onChange={()=> console.log('changed')} display_name={display_name} />
                <div className="row">
                    {this.showAlbums(this.props.location.state.data.albums)}
                </div>
            </div>
        )
    }
}
