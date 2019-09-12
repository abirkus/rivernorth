import axios from 'axios';

const SET_APTS = 'SET_APTS';

const setApts = apts => {
	return {
		type: SET_APTS,
		apts,
	};
};

//thunk
export const fetchApartments = () => {
	return async dispatch => {
		try {
			console.log('Thunk');
			const {data} = await axios.get('/api/apartments');
			console.log('Thunk', data);
			dispatch(setApts(data));
		} catch (err) {
			console.log('Error', err);
		}
	};
};

const initialState = [];

//reducer
const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_APTS: {
			return action.apts;
		}
		default: {
			return state;
		}
	}
};

export default appReducer;
