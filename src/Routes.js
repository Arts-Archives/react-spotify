import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
// Our application routes
import App from './components/App';
import Dashboard from "./components/Dashboard";
import ArtistAlbums from "./components/ArtistAlbums";
import AlbumTracks from "./components/AlbumTracks";
import UserProfile from "./components/UserProfile";

const appRoutes = [
  {
    exact: true,
    path: "/",
    component: App
  },
  {
    exact: false,
    path: "/react-spotify",
    component: Dashboard
  },
  {
    exact: false,
    path: "/artist-albums/:artistId/:artistName",
    component: ArtistAlbums
  },
  {
    exact: false,
    path: "/album-tracks/:albumId/:albumName",
    component: AlbumTracks
  },
  {
    exact: false,
    path: "/user-profile",
    component: UserProfile
  }
];

class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderRoutes = (routes) => {
        let allRoutes = [];
        routes.map((route,index) => {
            let exact = route.exact ? true : false;
            allRoutes.push(
                <Route 
                    exact={exact}
                    path={route.path}
                    component={route.component}
                    key={index}
                    {...this.props}
                />
            );
        })
        return allRoutes;
    }

    render(){
        return(
            <div>
                {this.renderRoutes(appRoutes)}
            </div>
        )
    }
}



// Render App to DOM
ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>, 
    document.getElementById('react-spotify')
);
