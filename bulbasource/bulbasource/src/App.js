import React from 'react';
import './App.css';
import './Bulb.css';
import Bulb from './Bulb';
import Header from './Header'
import Info from './Info';
import ElectricityProductionDataQuery from './DataImporter';


class App extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			data: [[{name: "", value: 0, color: "#222222"}]],
			infoData: [],
			showInfo: false
        };

		this.handleData = this.handleData.bind(this);
		this.onSourceClick = this.onSourceClick.bind(this);
		this.onInfoBoxClose = this.onInfoBoxClose.bind(this);
    }
    
	componentDidMount() {
		ElectricityProductionDataQuery(this.handleData);
	}

  	handleData(data) {
		this.setState({data: data});
	}

	onSourceClick(sourceData) {
		this.setState({
			infoData: sourceData,
			showInfo: true
		})
	}

	onInfoBoxClose() {
		document.documentElement.style = ".info-box-animation"

		this.setState({
			showInfo: false
		})
	}

  	render() {
		return (
			<div>
				<Header></Header>
				<Bulb data={this.state.data[0]} onSourceClick={this.onSourceClick}></Bulb>

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
