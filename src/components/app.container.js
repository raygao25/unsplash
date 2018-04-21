import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPhoto } from '../action/action';

import app from './app';

/** */
const mapStateToProps = (state) => ({
	photos: state.photos,
});

/** */
const mapDispatchToProps = (dispatch) => bindActionCreators({
	loadPhoto: loadPhoto.start,
}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default App;
