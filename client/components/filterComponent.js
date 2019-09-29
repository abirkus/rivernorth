import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCustomDataThunk} from '../redux/reducer';

class filterComponent extends Component {
	constructor(props) {
		super(props);
		this.handleSlider = this.handleSlider.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
		this.state = {
			limit: '',
			zipcode: [],
			dateStart: '',
			dateEnd: '',
		};
	}

	clearFilter() {
		this.setState({
			limit: '',
			zipcode: [],
			dateStart: '',
			dateEnd: '',
		});
	}

	handleSlider(evt) {
		this.setState({
			limit: evt.target.value,
		});
	}

	handleCheck(evt) {
		if (event.target.name === 'zipcode') {
			if (this.state.zipcode.includes(evt.target.value)) {
				let arr = this.state.zipcode.filter(
					zip => zip !== evt.target.value
				);
				this.setState({
					zipcode: arr,
				});
			} else {
				let arr = [...this.state.zipcode, evt.target.value];
				this.setState({
					zipcode: arr,
				});
			}
		}
	}

	handleChange(evt) {
		if (evt.target.name !== 'zipcode') {
			this.setState({
				[evt.target.name]: evt.target.value,
			});
		}
	}

	handleSubmit(evt) {
		evt.preventDefault();
		let obj = {};
		if (this.state.limit) {
			obj.limit = this.state.limit;
		} else {
			obj.limit = 100;
		}
		if (this.state.zipcode.length) {
			obj.zipcode = this.state.zipcode;
		} else {
			obj.zipcode = [
				'60610',
				'60611',
				'60601',
				'60654',
				'60614',
				'60647',
				'60618',
				'60612',
				'60622',
				'60661',
				'60607',
				'60606',
			];
		}
		if (this.state.dateStart) {
			obj.dateStart = this.state.dateStart;
		}
		if (this.state.dateEnd) {
			obj.dateEnd = this.state.dateEnd;
		}

		this.props.fetchCustom(obj);
		let newObj = {
			target: {
				id: 4,
			},
		};
		this.props.filterOff(newObj);

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
			<div className='filterComponent'>
				<h4>Filter Data</h4>
				<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<fieldset className='form-container'>
						<legend>Filter your data</legend>
						<div>Zipcodes: </div>
						<div onChange={this.handleCheck}>
							<span>
								<span>Gold Coast</span>
								<input
									type='checkbox'
									name='zipcode'
									value='60610'
								/>
								60610
								<input
									type='checkbox'
									name='zipcode'
									value='60611'
								/>
								60611
							</span>
							<br />
							<span>
								<span>River North</span>
								<input
									type='checkbox'
									name='zipcode'
									value='60601'
								/>
								60601
								<input
									type='checkbox'
									name='zipcode'
									value='60654'
								/>
								60654
							</span>
							<br />
							<span>
								<span>Logan Square</span>
								<input
									type='checkbox'
									name='zipcode'
									value='60614'
								/>
								60614
								<input
									type='checkbox'
									name='zipcode'
									value='60647'
								/>
								60647
								<input
									type='checkbox'
									name='zipcode'
									value='60618'
								/>
								60618
							</span>
							<br />
							<span>
								<span>West Town</span>
								<input
									type='checkbox'
									name='zipcode'
									value='60612'
								/>
								60612
								<input
									type='checkbox'
									name='zipcode'
									value='60622'
								/>
								60622
							</span>
							<br />
							<span>
								<span>Fulton Market</span>
								<input
									type='checkbox'
									name='zipcode'
									value='60661'
								/>
								60661
								<input
									type='checkbox'
									name='zipcode'
									value='60607'
								/>
								60607
								<input
									type='checkbox'
									name='zipcode'
									value='60606'
								/>
								60606
							</span>
						</div>
						<div className='datecontainer'>
							<div className='start'>
								<div> Enter a date after 2007-01-01: </div>
								<input
									type='date'
									name='dateStart'
									min='2007-01-01'
									value={this.state.dateStart}
								/>
							</div>
							<div className='end'>
								<div> Enter a date before today: </div>
								<input
									type='date'
									name='dateEnd'
									max={today}
									value={this.state.dateEnd}
								/>
							</div>
						</div>
						<div>How many data points?</div>
						<div className='slidecontainer'>
							<input
								type='range'
								min='1'
								max='10000'
								value={this.state.limit}
								className='slider'
								id='myRange'
								onChange={this.handleSlider}
							/>

							<div className='box-minmax'>
								<span>1</span>
								<span>10,000</span>
							</div>
							<div>Value: {this.state.limit}</div>
						</div>
					</fieldset>

					<button type='submit'>Filter</button>
					<button type='button' onClick={this.clearFilter}>
						Clear Filters
					</button>
				</form>
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
		fetchCustom: obj => dispatch(fetchCustomDataThunk(obj)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(filterComponent);
