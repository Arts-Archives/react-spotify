import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
// Our application routes
import App from './App';

const appRoutes = [
    {
        exact: true,
        path: '/',
        component: App
    }
];

class Routes extends Component {

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
