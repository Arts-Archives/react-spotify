import React, { Component } from 'react'
import axios from 'axios';
import ReactPlayer from 'react-player'; 
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
            let inherit = 'inherit';
            tracks.map((track, index) => { 
                results.push(
                    <div className="col-md-3 mt-5">
                        <Card 
                            name={track.name}
                            id={track.id}
                            key={index}                                                                                                            
                        />
                        <ReactPlayer 
                            url={track.preview_url} 
                            playing={false}
                            width={inherit}
                            height={80}
                            style={{backgroundColor: '#27ae60'}}                            
                            controls={true}
                            config={{
                                file:{
                                    forceAudio: true
                                }
                            }}                            
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
        const albumNameCleanedUp = this.props.match.params.albumName.replace(/[-]/g," ").trim();
        return (
            <div>
                <Nav 
                    imageURL={images[0].url}  
                    display_name={display_name} 
                    {...this.props}
                />
                <div className="justify-content-center mt-5 row">
                    <p className="text-center display-5">
                        Displaying tracks from the album { albumNameCleanedUp }
                    </p>
                </div>
                <div className="row">
                    {this.showTracks(tracks)}
                </div>
            </div>
        )
    }
}
