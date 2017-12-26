import React from 'react';
import './styles.css';

const Card = ({ imageURL, name, id, onClick, text }) => {
    if(imageURL){
        return (
            <div className="card mt-5" key={id}>
                <img 
                    className="card-img-top" 
                    src={imageURL} 
                    alt="Card image cap"
                    style={styles.imageStyles} 
                />
                <div className="card-body">
                    <h4 className="card-title">{name}</h4>
                    <p className="card-text"></p>
                    <button 
                        href="#" 
                        className="btn btn-outline-success"
                        onClick={onClick} 
                    >
                        {text}
                    </button>               
                </div>
            </div>
        )
    }else{
        return <div className="card mt-5" key={id}>
            <div className="card-body" style={styles.trackStyles}>
              <h4 className="card-title">{name}</h4>
              <p className="card-text" />            
            </div>
          </div>;
    }
    
}

const styles = {
    imageStyles: {
        maxWidth: 280,
        minHeight: 200,
        maxHeight: 200
    },
    trackStyles: {
        minHeight: 130,
        overFlow: 'hidden'
    }
}

export { Card }