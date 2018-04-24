import React from 'react';
import Modal from 'react-modal';

import './style.css';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */


Modal.setAppElement('body');

/**
 * Component to show photo in full-screen
*/
class DetailView extends React.Component {
	/**
	 * Get state from new props
	 */
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.allPhotos.length === 0) return {};
		const { match, history, allPhotos } = nextProps;
		const photoId = match.params.id;

		const index = allPhotos.findIndex((photo) => photo.id === photoId);

		const {
			date, firstName, lastName, likes, profileImage,
		} = allPhotos[index];

		const url = allPhotos[index].urls.regular;

		const previousId = index > 0 ? allPhotos[index - 1].id : null;
		const nextId = index < allPhotos.length - 1 ? allPhotos[index + 1].id : null;
		return {
			history,
			photoId,
			date,
			firstName,
			lastName,
			likes,
			profileImage,
			url,
			previousId,
			nextId,
		};
	}

	/** */
	constructor() {
		super();
		this.state = {};
	}

	/** */
	componentWillUnmount() {
		setTimeout(() => document.getElementById(this.state.photoId).focus(), 0);
	}

	getPhotoComponent = () => (
		<div className="DetailView-Photo">
			<span
				className="Nav-button"
				onClick={() => {
					if (this.state.previousId) this.state.history.push(`/photo/${this.state.previousId}`);
				}}
			>
				<i className="fa fa-chevron-left fa-2x" />
			</span>

			<img src={this.state.url} alt="" tabIndex="-1" />

			<span
				className="Nav-button"
				onClick={() => {
					if (this.state.nextId) this.state.history.push(`/photo/${this.state.nextId}`);
				}}
			>
				<i className="fa fa-chevron-right fa-2x" />
			</span>
		</div>
	);


	getInfoComponent = () => (
		<div className="DetailView-Info">
			<div className="Profile">
				<img src={this.state.profileImage} alt="User profile" />
				<div className="User-Name">
					{`${this.state.firstName} ${this.state.lastName}`}
				</div>
			</div>
			<div className="Date">
				{new Date(this.state.date).toDateString().substring(4)}
			</div>
			<div className="Likes">
				<i className="fa fa-heart fa-lg" style={{ color: 'red' }} />
				{` ${this.state.likes}`}
			</div>
		</div>
	);


	/**
	 * Render method
	*/
	render() {
		return (
			<div className="DetailView">
				<Modal
					className="Modal"
					isOpen
					contentLabel="Photo details"
					onRequestClose={() => this.state.history.push('/')}
				>
					{this.getPhotoComponent()}
					{this.getInfoComponent()}
					<i className="fa fa-times fa-2x" onClick={() => this.state.history.push('/')} />
				</Modal>
			</div>);
	}
}


export default DetailView;
