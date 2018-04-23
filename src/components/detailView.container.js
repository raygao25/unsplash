import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clickPhoto } from '../action/action';
import detailView from './detailView';

/** */
const mapStateToProps = (state) => ({
	allPhotos: state.allPhotos,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	clickPhoto,
}, dispatch);

const DetailView = connect(mapStateToProps, mapDispatchToProps)(detailView);

export default DetailView;
