import React from 'react';
import './App.css';
import './Bulb.css';
import Bulb from './Bulb';
import Header from './Header'
import Info from './Info';
import ElectricityProductionDataQuery from './DataImporter';
import TimeSlider from './TimeSlider';


class App extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			data: null,
			infoData: null,
			showInfo: false,
			dataIndex: 0
        };
    }
    
	componentDidMount() {
		ElectricityProductionDataQuery(this.handleData);
	}

  	handleData = (data) => {
		this.setState({data: data});
	}

	onSourceClick = (sourceData) => {
		this.setState({
			infoData: sourceData,
			showInfo: true
		})
	}

	onTimeSliderChange = (index) => {
		this.setState({dataIndex: index}); 
	}

	onInfoBoxClose = () => {
		document.documentElement.style = ".info-box-animation"

		this.setState({
			showInfo: false
		})
	}

  	render() {
		
		return (
			<div>
				<Header></Header>

				{this.state.data ? 
					<Bulb data={this.state.data.dataValues[this.state.dataIndex]} onSourceClick={this.onSourceClick}></Bulb>	
				:
					null
				}

				{this.state.data ? 
					<TimeSlider dates={this.state.data.dataDates} onTimeSliderChange={this.onTimeSliderChange}></TimeSlider>
				:
					null
				}
				
				{this.state.showInfo ? 
					<Info infoData={this.state.infoData} onInfoBoxClose={this.onInfoBoxClose}></Info>	
				:
					null
				}
			</div>
		);
  	}
}

export default App;
