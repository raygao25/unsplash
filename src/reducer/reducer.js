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
	loading: false,
});

/**
 * Reducer
 */
const reducer = (state = initialState(), action) => {
	const { payload } = action;
	let newPhotos = [];
	switch (action.type) {
		case loadPhoto.START:
			return {
				...state,
				loading: true,
			};
		case loadPhoto.SUCCESS:
			newPhotos = payload.map((photoObj) => ({
				ratio: photoObj.width / photoObj.height,
				id: photoObj.id,
				likes: photoObj.likes,
				date: photoObj.created_at,
				firstName: photoObj.user.first_name,
				lastName: photoObj.user.last_name,
				profileImage: photoObj.user.profile_image.medium,
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
				loading: false,
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
