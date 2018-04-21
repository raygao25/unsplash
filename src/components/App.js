import React, { Component } from 'react';

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
	}

	/**
	 * Render method
	 */
	render() {
		return (
			<div className="App">
				To get started, edit <code>src/App.js</code> and save to reload.
				<div className="PhotoGrid">
					{this.props.photos.map((photoObj) => (
						<img className="Photo" src={photoObj.urls.small} alt="Mountain View" height="300px" tabIndex="1" />
					))}
				</div>
				<button onClick={() => this.props.loadPhoto()}>
					Load more
				</button>
			</div>
		);
	}
}

export default App;
