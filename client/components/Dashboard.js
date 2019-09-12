import React, {Component} from 'react';
import LineGraph from './LineGraph';
const chartIcon = 'https://image.flaticon.com/icons/svg/190/190766.svg';
import Sidebar from './Sidebar.js';

export default class Dashboard extends Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		data: managerData,
	// 		labels: yearLabels,
	// 	};
	// }

	render() {
		// const {data, labels} = this.state;
		return (
			<div>
				<div className='sidebar'>
					<Sidebar />
				</div>
				<div className='graph'>
					<header>
						<h1>
							<span>
								<img
									src={chartIcon}
									alt='bar chart icon'
									width='45'
									height='45'
								/>{' '}
							</span>
							Dashboard
						</h1>
					</header>
					<LineGraph />
				</div>
			</div>
		);
	}
}
