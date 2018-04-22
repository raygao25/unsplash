import {
	loadPhoto,
	reformatPhoto,
} from '../action/action';
import formatPhotos from '../components/utilities/formatPhotos';

/**
 * Returns initial state
 */
const initialState = () => ({
	allPhotos: [],
	photoGridElement: [],
	nextPage: 1,
});

/**
 * Reducer
 */
const reducer = (state = initialState(), action) => {
	const { payload } = action;
	let newPhotos = [];
	switch (action.type) {
		case loadPhoto.SUCCESS:
			newPhotos = payload.map((photoObj) => ({
				ratio: photoObj.width / photoObj.height,
				id: photoObj.id,
				likes: photoObj.likes,
				date: photoObj.created_at,
				userName: photoObj.user.username,
				urls: photoObj.urls,
			}));
			return {
				...state,
				allPhotos: [
					...state.allPhotos,
					...newPhotos,
				],
				photoGridElement: [
					...state.photoGridElement,
					...formatPhotos(newPhotos),
				],
				nextPage: state.nextPage + 1,
			};
		case reformatPhoto.type:
			return {
				...state,
				photoGridElement: formatPhotos(state.allPhotos),
			};
		default:
			return state;
	}
};

export default reducer;
