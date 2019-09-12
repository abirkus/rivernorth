/* eslint-disable no-new */
import React, {Component} from 'react';
import Chart from 'chart.js';

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
//Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0;
//--Chart Style Options--//

export default class LineGraph extends Component {
	constructor() {
		super();
		this.chartRef = React.createRef();
		// In the typical React dataflow, props are the only way that parent components interact with their children.
		// To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow.
		// The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

		// Refs are created using React.createRef() and attached to React elements via the ref attribute.
		// Refs are commonly assigned to an instance property when a component is constructed so they can be referenced throughout the component.
	}

	componentDidMount() {
		const myChartRef = this.chartRef.current.getContext('2d');

		new Chart(myChartRef, {
			type: 'scatter',
			data: {
				labels: this.props.labels,
				datasets: [
					{
						label: 'Bidder Profit',
						data: this.props.data,
					},
				],
			},
			options: {
				//Customize chart options
			},
		});
	}
	render() {
		return (
			<div className='test'>
				<canvas id='myChart' ref={this.chartRef} />
			</div>
		);
	}
}