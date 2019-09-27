import React, {Component} from 'react';
import {connect} from 'react-redux';

class filterComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
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
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LineGraph);
