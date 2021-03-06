import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Greeting from './Greeting';
require('babel-polyfill');
import Dashboard from './Dashboard';
import {fetchApartments} from '../redux/reducer.js';

class Root extends React.Component {
	componentDidMount() {
		try {
			this.props.fetchApartments();
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		return (
			<Router>
				<div className='container'>
					<nav className='topnav'>
						<Link to='/'>Home</Link>
						<Link to='/graph'>Graph</Link>
						<Link to='/map'>Map</Link>
					</nav>

					<div className='root'>
						<Switch>
							<Route exact path='/' component={Greeting} />
							<Route exact path='/graph' component={Dashboard} />
							<Route exact path='/map' component={Dashboard} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchApartments: () => dispatch(fetchApartments()),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Root);
