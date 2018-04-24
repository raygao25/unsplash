import React, { Component } from 'react';
import { Observable } from 'rxjs/Observable';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import DetailView from './detailView.container';
import './style.css';

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
		Observable.fromEvent(window, 'resize')
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
				<header className="App-header">
					<i className="fa fa-camera-retro fa-lg" />
				</header>
				<div className="PhotoGrid">
					{this.props.photoGridElement}
				</div>
				{this.props.loading &&
					<i
						className="fa fa-spinner fa-3x fa-spin"
						style={{
							left: '50%',
							position: 'absolute',
							padding: '20px',
						}}
					/>
				}
				<Route path="/photo/:id" component={DetailView} />
			</div>
		);
	}
}

App.propTypes = {
	photoGridElement: PropTypes.arrayOf(PropTypes.element),
	loading: PropTypes.bool,
	loadPhoto: PropTypes.func,
	reformatPhoto: PropTypes.func,
};

export default App;
