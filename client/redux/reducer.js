import axios from 'axios';

const SET_APTS = 'SET_APTS';
const GET_DEAL_PROFIT = 'GET_DEAL_PROFIT';
const GET_PRICE_SQFT = 'GET_PRICE_SQFT';
const GET_CUSTOM_DATA = 'GET_CUSTOM_DATA';

export const setApts = apts => {
	return {
		type: SET_APTS,
		apts,
	};
};

export const getDealProfit = apts => {
	return {
		type: GET_DEAL_PROFIT,
		apts,
	};
};

export const getPriceSqFt = apts => {
	return {
		type: GET_PRICE_SQFT,
		apts,
	};
};

export const getCustomData = apts => {
	return {
		type: GET_CUSTOM_DATA,
		apts,
	};
};

//thunk
export const fetchApartments = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get('/api/apartments');
			dispatch(setApts(data));
		} catch (err) {
			console.log('Error', err);
		}
	};
};

export const fetchHousePriceIndex = apts => {
	return async dispatch => {
		try {
			console.log('do nothing in this thunk');
			dispatch(setApts());
		} catch (err) {
			console.log('Error', err);
		}
	};
};

export const getProfitThunk = apts => {
	return dispatch => {
		let apts2 = apts.map(apt => {
			apt.buyerProfit = String(apt.SoldPrice - apt.ListPrice);
			return apt;
		});
		dispatch(getDealProfit(apts2));
	};
};

export const getPriceSqFtThunk = apts => {
	return dispatch => {
		let apts2 = apts.reduce((accum, curr) => {
			if (Number(curr.ApproxSqFt) !== 0) {
				curr.PriceSqFt = String(
					Math.floor(curr.SoldPrice / curr.ApproxSqFt)
				);

				if (!accum) {
					accum = [curr];
				} else {
					accum.push(curr);
				}
			}
			return accum;
		}, []);
		dispatch(getPriceSqFt(apts2));
	};
};

export const fetchCustomDataThunk = obj => {
	return async dispatch => {
		try {
			let zipcodes = obj.zipcode;
			let customData = {};
			const {data} = await axios.put('/api/apartments/custom', obj);
			zipcodes.forEach(zip => {
				customData[zip] = [];
			});
			data.forEach(apt => {
				customData[apt.ZipCode].push(apt);
			});

			dispatch(getCustomData(customData));
		} catch (err) {
			console.log('Error', err);
		}
	};
};

const initialState = {
	apts: [],
	customData: {},
};

//reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case SET_APTS: {
			return {...state, apts: action.apts};
		}
		case GET_DEAL_PROFIT: {
			return {...state, apts: action.apts};
		}
		case GET_PRICE_SQFT: {
			return {...state, apts: action.apts};
		}
		case GET_CUSTOM_DATA: {
			return {...state, customData: action.apts};
		}
		default: {
			return state;
		}
	}
};
