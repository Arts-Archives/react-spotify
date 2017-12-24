import React from 'react';
import './styles.css';

const Card = ({ imageURL, name, id, onClick, text }) => {
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
                    className="btn btn-primary"
                    onClick={onClick} 
                >
                    {text}
                </button>               
            </div>
        </div>
    )
}

const styles = {
    imageStyles: {
        maxWidth: 280,
        maxHeight: 200,
        minHeight: 200
    }
}

export { Card }