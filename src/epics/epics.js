import { combineEpics } from 'redux-observable';

import { loadPhoto } from '../action/action';
import getMockData from './mockData';

/**
 * Epic for loading photos
 */
const loadPhotoEpic = (action$) =>
	action$.ofType(loadPhoto.START)
		.map(() => loadPhoto.success(getMockData()));


const rootEpic = combineEpics(loadPhotoEpic);

export default rootEpic;
