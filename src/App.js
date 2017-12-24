import React, { Component } from 'react';
import jsonp from 'jsonp';
import axios from 'axios';
import {
  spotifyWebApiURL,
  clientID,
  redirectURI,
  clientSecret,
  spotifyProfileURL
} from "./constants";
import {spotifyTokenURL} from './constants/app_secrets';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: "React Spotify", 
      authToken: "", 
      authorized: false
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if(url.indexOf('token=')>-1){
      let authToken = url.split('token=')[1].split('&')[0].trim();
      let authorized = true;
      this.setState({ authToken, authorized });
    }
  }

  handleAuthFlow = (event) => {
    event.preventDefault();
    if(this.state.authorized){
      axios
        .get(spotifyProfileURL+this.state.authToken)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }else{
      window.location.assign(spotifyWebApiURL);
    }
  }

  getToken = () => {
    console.log("yep auth is true");    
  }

	render() {
    console.log('this.state',this.state);
    if(this.state.authorized){
      this.getToken()
    }
		return <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h3 className="display-4">
              {this.state.value}
              <small className="text-muted">
                {" "}
                a react app connected to the Spotify Web API{" "}
              </small>
            </h3>
            <hr className="my-4" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="display-5">
              Just click the button below to authorize your Spotify account to start using React Spotify!
            </p>
            <button 
              type="button" 
              className="btn btn-outline-success"
              onClick={this.handleAuthFlow}
            >
              {
               this.state.authorized ? 'Enter to app' : 'Sign in with Spotify'
              }
            </button>
          </div>
        </div>
      </div>;
	}
}
