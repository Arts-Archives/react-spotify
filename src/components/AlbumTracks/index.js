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
                    <div className="col-md-3">
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
