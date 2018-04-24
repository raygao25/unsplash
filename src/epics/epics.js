import { combineEpics } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import { ajax } from 'rxjs/observable/dom/ajax';

import { loadPhoto } from '../action/action';


const accessKey = '0cd3d3abcd4f41e708727f2da359e67da874039d03d73a849ab76cde41e728e0';
/**
 * Epic for loading photos
 */
const loadPhotoEpic = (action$, store) =>
	action$.ofType(loadPhoto.START)
		.mergeMap(() => ajax.getJSON(`https://api.unsplash.com/photos/curated?client_id=${accessKey}&page=${store.getState().nextPage}&per_page=30`))
		.map((res) => loadPhoto.success(res || []))
		.catch((err) => of({
			type: 'FETCH_STATS_DAILY_FAILED',
			payload: err.xhr.response,
			error: true,
		}));


const rootEpic = combineEpics(loadPhotoEpic);

export default rootEpic;
