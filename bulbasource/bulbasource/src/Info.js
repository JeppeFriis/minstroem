import React from 'react';
import './Info.css';

class Info extends React.Component {

    componentWillMount() {
        document.documentElement.style="--header-text-color: var(--light);"
    }

    componentDidMount() {
        const boxAnimation = document.getElementById('info-box');

        boxAnimation.addEventListener('animationend', (eventObject) => {
            if (getComputedStyle(eventObject.target).opacity == 0) {
                this.infoBoxClosed();
            }
        });
    }

    infoBoxClosed = () => {
        this.props.onInfoBoxClose();
    }

    infoBoxShouldClose = () => {
        const backdropAnimation = document.getElementById('info-backdrop');
        const boxAnimation = document.getElementById('info-box');

        backdropAnimation.className += " info-backdrop-end-animation"
        boxAnimation.className += " info-box-end-animation"
    }

    render() {
        return (
            <div>
                <div id="info-backdrop" style={{background: this.props.infoData.fill}} className="backdrop info-backdrop-start-animation" onClick={this.infoBoxShouldClose}></div>
                
                <div id="info-box" className="info-box info-box-start-animation"> 
                    <div className="header">
                        <div className="site-nav wrapper">
                            <div className="close" onClick={this.infoBoxShouldClose}>
                                <svg class="svg-icon" viewBox="0 0 20 20">
                                    <path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                                </svg>
                            </div> 
                        </div>
                    </div>
                    
                </div>
            </div>

        );
    }
}

export default Info;