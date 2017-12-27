import React from 'react';

const ProfileRow = ({ text }) => {
    return (
        <div className="row justify-content-center mt-3">
            <h1>
                <span className="badge badge-success px-3 py-3">
                    {text}
                </span>
            </h1>
        </div>
    )
}

export { ProfileRow }
