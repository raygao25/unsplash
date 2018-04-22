import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	loadPhoto,
	reformatPhoto,
} from '../action/action';

import app from './app';

/** */
const mapStateToProps = (state) => ({
	photoGridElement: state.photoGridElement,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	loadPhoto: loadPhoto.start,
	reformatPhoto,
}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default App;
