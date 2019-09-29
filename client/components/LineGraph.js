/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-new */
import React, {Component} from 'react';
import Chart from 'chart.js';
import {connect} from 'react-redux';
import {
	getProfitThunk,
	getPriceSqFtThunk,
	fetchApartments,
	fetchHousePriceIndex,
} from '../redux/reducer';
import FilterComponent from './filterComponent';
let myLineChart;
//import * as d3 from "d3";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
//Chart.defaults.global.elements.line.tension = 1;

class LineGraph extends Component {
	constructor(props) {
		super(props);
		this.chartRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);
		this.buildChart = this.buildChart.bind(this);
		// this.toggleFilter = this.toggleFilter.bind(this);
		// In the typical React dataflow, props are the only way that parent components interact with their children.
		// To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow.
		// The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

		// Refs are created using React.createRef() and attached to React elements via the ref attribute.
		// Refs are commonly assigned to an instance property when a component is constructed so they can be referenced throughout the component.
		let arr = this.props.apts.map(apt => {
			return {x: new Date(apt.ClosedDate), y: apt.SoldPrice};
		});
		this.state = {
			priceData: arr,
			title: `House Price Index`,
			filterOn: false,
		};
	}
	componentDidMount() {
		let obj = new Set();
		this.props.apts.forEach(apt => {
			if (!obj.has(apt.ZipCode)) {
				obj.add(apt.ZipCode);
			}
		});

		console.log(obj);
		this.buildChart();
	}

	componentDidUpdate() {
		this.buildChart();
	}

	// toggleFilter() {}

	handleClick(evt) {
		let data;
		if (Number(evt.target.id) === 1) {
			this.props.getDealProfit(this.props.apts);
			data = this.props.apts.map(apt => {
				return {x: new Date(apt.ClosedDate), y: apt.buyerProfit};
			});

			this.setState({
				priceData: data,
				title: `Buyer's Profit`,
			});
		} else if (Number(evt.target.id) === 2) {
			this.props.getHousePriceIndex();
			data = this.props.apts.map(apt => {
				return {x: new Date(apt.ClosedDate), y: apt.SoldPrice};
			});
			this.setState({
				priceData: data,
				title: `House Price Index`,
			});
		} else if (Number(evt.target.id) === 3) {
			this.props.getPriceSqFt(this.props.apts);

			data = this.props.apts.reduce((accum, curr) => {
				if (Number(curr.ApproxSqFt) !== 0) {
					curr = {x: new Date(curr.ClosedDate), y: curr.PriceSqFt};
					if (!accum) {
						accum = [curr];
					} else {
						accum.push(curr);
					}
				}
				return accum;
			}, []);
			this.setState({
				priceData: data,
				title: `Price per Square Foot`,
			});
		} else if (Number(evt.target.id) === 4) {
			this.setState({
				filterOn: !this.state.filterOn,
			});
		}
	}

	buildChart() {
		const myChartRef = this.chartRef.current.getContext('2d');

		if (typeof myLineChart !== 'undefined') myLineChart.destroy();

		// Because JS doesn't have a nice way to name months because they may differ per locale

		// Use reduce to aggregate your data. Pass around a hash so that we have
		// direct access to groups as well as ensure groups appear just once.
		const median = function(numsArr) {
			let num = 0;
			let numsLen = numsArr.length;
			numsArr.sort();
			num = numsArr[Math.floor(numsLen / 2)];
			return num;
		};

		var monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const dataByMonth = this.state.priceData.reduce((accum, curr) => {
			let date = new Date(curr.x);
			let value = curr.y;
			let month = monthNames[date.getMonth()];
			var year = date.getFullYear();
			var group = month + year;

			if (!accum[group]) {
				accum[group] = [value];
			} else {
				accum[group].push(value);
			}

			return accum;
		}, {});

		console.log(dataByMonth);
		let medianData = [];
		for (let key in dataByMonth) {
			if (dataByMonth.hasOwnProperty(key)) {
				medianData.push({
					x: new Date(key),
					y: median(dataByMonth[key]),
				});
			}
		}
		medianData.sort((a, b) => {
			return a.x - b.x;
		});

		let slopeData = [medianData[0], medianData.slice(-1)[0]];

		var options = {
			responsive: true, // Instruct chart js to respond nicely.
			scales: {
				xAxes: [
					{
						type: 'time',
						time: {parser: 'YYYY/MM/DD'},
					},
				],
				yAxes: [
					{
						ticks: {
							// Include a dollar sign in the ticks
							callback: function(value, index, values) {
								return '$' + value;
							},
						},
					},
				],
			},
			title: {
				display: true,
				text: this.state.title,
			},
		};

		myLineChart = new Chart(myChartRef, {
			type: 'line',
			data: {
				datasets: [
					{
						type: 'scatter',
						label: 'Price Data', // Name the series
						data: this.state.priceData, // Specify the data values array
						borderColor: '#2196f3', // Add custom color border
						backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
						showLine: false,
					},
					{
						type: 'line',
						label: 'Monthly Median Sold Price',
						data: medianData,
						borderColor: '#060600', // Add custom color border
						backgroundColor: '#060600',
						fill: false,
					},
					{
						type: 'line',
						label: 'Slope of the price trend',
						data: slopeData,
						borderColor: '#060600', // Add custom color border
						backgroundColor: '#060600',
						fill: false,
					},
				],
			},
			options: options,
		});
	}

	render() {
		return (
			<div>
				<div onClick={id => this.handleClick(id)} className='charttabs'>
					<button type='button' id='1'>
						Get deal profit
					</button>
					<button type='button' id='2'>
						Get price index
					</button>
					<button type='button' id='3'>
						Get price per Square Foot
					</button>

					<button type='button' id='4' className='filter'>
						Filter
					</button>
				</div>
				<div className='graphContainer'>
					<canvas id='myChart' ref={this.chartRef} />

					{this.state.filterOn ? (
						<div>
							<FilterComponent filterOff={this.handleClick} />
						</div>
					) : (
						<div />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		apts: state,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getDealProfit: apts => dispatch(getProfitThunk(apts)),
		getPriceSqFt: apts => dispatch(getPriceSqFtThunk(apts)),
		getHousePriceIndex: () => dispatch(fetchHousePriceIndex()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LineGraph);
