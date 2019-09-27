import React, {Component} from 'react';
import {connect} from 'react-redux';

class filterComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSlider = this.handleSlider.bind(this);
		this.state = {
			slider: 1,
			zipcode: [],
			dateStart: [],
			dateEnd: [],
		};
	}

	handleSlider(evt) {
		this.setState({
			slider: evt.target.value,
		});
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		let obj = {};
		if (this.state.slider) {
			obj.slider = this.state.slider;
		}
		if (this.state.zipcode) {
			obj.zipcode = this.state.zipcode;
		}
		if (this.state.dateStart) {
			obj.dateStart = this.state.dateStart;
		}
		if (this.state.dateEnd) {
			obj.dateEnd = this.state.dateEnd;
		}
		this.fetchFilteredApts(obj);
		this.setState({
			slider: 1,
			zipcode: [],
			dateStart: [],
			dateEnd: [],
		});
		obj = {};
	}

	render() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}

		today = yyyy + '-' + mm + '-' + dd;

		return (
			<div>
				<h1>Filter Data</h1>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Filter your data</legend>
						<input
							type='checkbox'
							name='favorite_pet'
							value='zipcode'
						/>
						60654
						<br />
						<input
							type='checkbox'
							name='favorite_pet'
							value='zipcode'
						/>
						60610
						<br />
						<input
							type='checkbox'
							name='favorite_pet'
							value='zipcode'
						/>
						60622
						<br />
						<input
							type='checkbox'
							name='favorite_pet'
							value='zipcode'
						/>
						60607
						<br />
						<input
							type='checkbox'
							name='favorite_pet'
							value='zipcode'
						/>
						60647
						<br />
						<p> Enter a date after 2007-01-01:</p>
						<input type='date' name='bday' min='2007-01-01' />
						<br />
						<p> Enter a date before today:</p>
						<input type='date' name='bday' max={today} />
						<br />
						<br />
						<p>How many data points?</p>
						<div className='slidecontainer'>
							<input
								type='range'
								min='1'
								max='10000'
								value={this.state.slider}
								className='slider'
								id='myRange'
								onChange={this.handleSlider}
							/>
							<div>Value: {this.state.slider}</div>
						</div>
					</fieldset>

					<button type='submit'>Filter</button>
				</form>
			</div>
		);
	}
}

// const mapStateToProps = state => {
// 	return {
// 		apts: state,
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		fetchFilteredApts: obj => dispatch(fetchFilteredApts(obj)),
// 	};
// };
export default filterComponent;
