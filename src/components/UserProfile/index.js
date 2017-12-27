import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            auth: '',
            play_lists: [],
            error: ''
        };
    }

    componentDidMount = () => {
        axios.get(`https://api.spotify.com/v1/me/playlists?access_token=${this.state.auth.authToken}`)
        .then(response => {
            this.setState({
                play_lists: response.data.items
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({ error })
        })
    }
    

    componentWillMount = () => {
      this.setState({
        userData: this.props.location.state.userData,
        auth: this.props.location.state.auth
      });
    }

    routeBack = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    renderPlaylist = () => {
        if(this.state.play_lists.length){
            const { play_lists } = this.state;
            let playList = [];
            play_lists.map((item, index) => {
                playList.push(
                    <div className="col-md-3">
                        <img 
                            src={item.images[0].url}
                            className="img-responsive"
                            style={{maxWidth: 300, maxHeight: 300}}
                        />
                    </div>
                )
            })
            return playList
        }else{
            return <p>No hits</p>
        }
    }
    

    render() {
        console.log('props in UserProfile', this.props);
        console.log("state in UserProfile", this.state);
        const { images, display_name, email, product, followers: { total } } = this.props.location.state.userData;
        const styles = {
            imageStyles: {
                borderRadius: '50%'
            },
            textStyle: {
                color: 'white!important'
            }
        }
        return (
            <div>
                <div className="row mt-5">
                    <button onClick={this.routeBack} className="btn btn-outline-success">Back</button>
                </div>
                <div className="row mt-5 justify-content-center">
                    <img 
                        src={images[0].url} 
                        alt="" 
                        className="img-responsive"
                        style={styles.imageStyles}
                    />                    
                </div>
                <div className="row justify-content-center mt-3">
                    <h1>
                        <span className="badge badge-success px-3 py-3">
                            {display_name}
                        </span>
                    </h1>
                </div>
                <div className="row justify-content-center mt-3">
                    <h1>
                        <span className="badge badge-success px-3 py-3">
                            {email}
                        </span>
                    </h1>
                </div>
                <div className="row justify-content-center mt-3">
                    <h1>
                        <span className="badge badge-success px-3 py-3">
                            {product} user
                        </span>
                    </h1>
                </div>
                <div className="row justify-content-center mt-3">
                    <h1>
                        <span className="badge badge-success px-3 py-3">
                            {total} followers
                        </span>
                    </h1>
                </div>
                <div className="row justify-content-center mt-3">
                    <h1>
                        <span className="badge badge-success px-3 py-3">
                            Public Playlists
                        </span>
                    </h1>
                </div>
                <div className="row mt-3">
                {this.renderPlaylist()}
                </div>
            </div>
        )
    }
}
