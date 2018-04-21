import { loadPhoto } from '../action/action';


/**
 * Returns initial state
 */
const initialState = () => ({
	photos: [],
});

/**
 * Reducer
 */
const reducer = (state = initialState(), action) => {
	const { payload } = action;
	switch (action.type) {
		case loadPhoto.SUCCESS:
			return {
				...state,
				photos: [
					...state.photos,
					...payload.map((photoObj) => ({
						id: photoObj.id,
						likes: photoObj.likes,
						date: photoObj.created_at,
						userName: photoObj.user.username,
						urls: photoObj.urls,
					})),
				],
			};
		default:
			return state;
	}
};

export default reducer;
