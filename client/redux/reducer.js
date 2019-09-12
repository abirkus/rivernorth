import axios from 'axios';

export const SET_APTS = 'SET_APTS';

export const setApts = apts => {
	return {
		type: SET_APTS,
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

const initialState = [];

//reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case SET_APTS: {
			return action.apts;
		}
		default: {
			return state;
		}
	}
};
