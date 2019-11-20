import React from 'react';
import './Info.css';

class Info extends React.Component {

    componentWillMount() {
        document.documentElement.style="--header-text-color: var(--light);"
    }



    render() {
        return (
            <div>
                <div style={{background: this.props.infoData.fill}} className="backdrop info-backdrop-animation">

                </div>
                <div className="info-box info-box-animation"> 
                    <button onClick={this.props.onInfoBoxClose}></button>
                </div>
            </div>

        );
    }
}

export default Info;