import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <nav className="navbar navbar-toggleable-md navbar-light bg-faded justify-content-between">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <a className="navbar-brand" href="#">
              <img className="d-inline-block align-top" src={this.props.imageURL} alt="" height="60" width="60" />
            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    React Spotify
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    {this.props.display_name}
                  </a>
                </li>
              </ul>
            </div>
          </nav>;
    }
}