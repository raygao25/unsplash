import React, { Component } from 'react';
import { Observable } from 'rxjs/Observable';
import PropTypes from 'prop-types';

import './app.css';

/**
 * Main component
 */
class App extends Component {
	/**
	 * Called after component is mounted
	 */
	componentDidMount() {
		this.props.loadPhoto();

		// Reformat photos when resize window or rotate device
		Observable.merge(
			Observable.fromEvent(window, 'resize'),
			Observable.fromEvent(window, 'orientationchange'),
		)
			.debounceTime(300)
			.subscribe(() => this.props.reformatPhoto());

		// Infinite scroll
		Observable.fromEvent(window, 'scroll')
			.debounceTime(50)
			.subscribe(() => {
				if (window.innerHeight + window.scrollY > document.body.scrollHeight - 800) {
					this.props.loadPhoto();
				}
			});
	}


	/**
	 * Render method
	 */
	render() {
		return (
			<div className="App">
				<div className="PhotoGrid">
					{this.props.photoGridElement}
				</div>
				<button onClick={() => this.props.loadPhoto()}>
					Load more
				</button>
			</div>
		);
	}
}

App.propTypes = {
	photoGridElement: PropTypes.arrayOf(PropTypes.element),
	loadPhoto: PropTypes.func,
	reformatPhoto: PropTypes.func,
};

export default App;
