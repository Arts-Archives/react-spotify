import React, { Component  } from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            query: ''
        }        
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    captureSearch = (searchTerm) => {
        this.setState({ query: searchTerm })
    }

    render() {
        console.log('this.props in profile', this.props);
        console.log('this.state in profile', this.state);
        const { images, display_name } = this.props.location.state.current_user.user;
        return <nav className="navbar navbar-toggleable-md navbar-light bg-faded justify-content-between">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <a className="navbar-brand" href="#">
              <img className="d-inline-block align-top" src={images[0].url} alt="" height="60" width="60" />
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
                    {display_name}
                  </a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={event => this.captureSearch(event.target.value)} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>;
    }
}