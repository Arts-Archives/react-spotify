import React, { Component } from 'react'
import axios from 'axios';
import Nav from '../Nav';
import { Card } from "../common";

export default class AlbumTracks extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    showTracks = (tracks) => {
        if(tracks!=undefined){
            console.log('tracks inside showTracks',tracks)
            let results = [];
            tracks.map((track, index) => { 
                results.push(
                    <div className="col-md-3">
                        <Card 
                            name={track.name}
                            id={track.id}
                            key={index}                            
                            onClick={(event) => {event.preventDefault(); console.log(track.preview_url)}}
                            text="Play Track"                                                     
                        />
                    </div>
               )                          
            })
            return results
        }else{
            return <p></p>
        }
    }

    
    render() {
        console.log("this.props in Tracks", this.props);
        const { data: { tracks }, current_user: { user: { images, display_name } } } = this.props.location.state;
        return (
            <div>
                <Nav 
                    imageURL={images[0].url} 
                    onChange={()=> console.log('changed')} 
                    display_name={display_name} 
                />
                <div className="row">
                    {this.showTracks(tracks)}
                </div>
            </div>
        )
    }
}
