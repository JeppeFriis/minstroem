import React from 'react';
import './TimeSlider.css';
import Flickity from 'react-flickity-component';



class TimeSlider extends React.Component {
    componentDidMount = () => {
        // You can register events in componentDidMount hook
        this.flkty.on('settle', () => {
            this.props.onTimeSliderChange(this.flkty.selectedIndex);
        })
    }

    componentWillUnmount = () => {
        this.flkty.off('settle');
    }
     
    
    render() {
        return(
            <Flickity
                flickityRef={c => this.flkty = c}
                className={'carousel'}
                options={{
                    prevNextButtons: false,
                    pageDots: false,
                    initialIndex: this.props.dates.length-1
                }}
            >   
                {
                    this.props.dates.map(date => (
                        <Time date={date}></Time>
                    ))
                }
            </Flickity>
        );
    }
}

class Time extends React.Component {
    render() {
        return(
            <div className="carousel-cell">
                <div className="carousel-cell-hours"> 
                    {this.props.date.slice(11,16)}
                </div>
                <div className="carousel-cell-date"> 
                    {this.props.date.slice(5,10)}
                </div>
            </div>
        );
    }
}

export default TimeSlider;