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
            data: [{name: "", value: 0, color: "#222222"}],
        };

        this.handleData = this.handleData.bind(this);
    }
    
	componentDidMount() {
		ElectricityProductionDataQuery(this.handleData);
	}

  	handleData(data) {
		this.setState({data: data});
	}

	onSourceClick(source) {
	}

  	render() {
		return (
			<div>
				<Header></Header>
				<Bulb data={this.state.data} onSourceClick={this.onSourceClick}></Bulb>
				<Info></Info>
			</div>
		);
  	}
}

export default App;
