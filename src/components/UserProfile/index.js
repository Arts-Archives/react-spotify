import React, { Component } from 'react'

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    componentWillMount = () => {
      this.setState({
          userData: this.props.location.state.userData
      })
    }

    routeBack = (event) => {
        event.preventDefault();
        this.props.history.goBack()
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
            </div>
        )
    }
}
