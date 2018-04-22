import {
	loadPhoto,
	reformatPhoto,
} from '../action/action';
import formatPhotos from '../utilities/formatPhotos';

/**
 * Returns initial state
 */
const initialState = () => ({
	allPhotos: [],
	photoGridElement: [],
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
