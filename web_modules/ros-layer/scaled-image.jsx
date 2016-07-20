import React from 'react';

export default class ScaledImage extends React.Component {
    render() {
        const url = this.props.src.replace(/ /g, '%20');
        return (
            <div
                className="scaled-image"
                style={{backgroundImage: 'url('+url+')'}}
            />
        )
    }
}
