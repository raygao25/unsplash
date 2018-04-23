import React from 'react';
import Modal from 'react-modal';

import './style.css';

Modal.setAppElement('body');

/** */
class DetailView extends React.Component {
	/** */
	componentWillUnmount() {
		setTimeout(() => document.getElementById(this.props.match.params.id).focus(), 0);
	}

	/** */
	render() {
		const { match, history, allPhotos } = this.props;
		const photoId = match.params.id;
		const index = allPhotos.findIndex((photo) => photo.id === photoId);
		const url = allPhotos[index].urls.small;
		return (
			<div className="DetailView">
				<Modal
					isOpen
					contentLabel="Photo details"
					onRequestClose={() => history.push('/')}
				>
					<img
						className="Photo"
						src={url}
						alt=""
					/>

					<button
						onClick={() => {
							if (index < allPhotos.length - 1) {
								history.push(`/photo/${allPhotos[index + 1].id}`);
							}
						}}
					>
						next
					</button>

					<button
						onClick={() => {
							if (index > 0) {
								history.push(`/photo/${allPhotos[index - 1].id}`);
							}
						}}
					>
						previous
					</button>
				</Modal>
			</div>);
	}
}

/**
 * Component to render photo in full screen
 */
// const DetailView = (props) => {
// 	const { match, history, allPhotos } = props;
// 	const photoId = match.params.id;
// 	const index = allPhotos.findIndex((photo) => photo.id === photoId);
// 	const url = allPhotos[index].urls.small;


// 	return (
// 		<div className="DetailView">
// 			<Modal
// 				isOpen
// 				contentLabel="Photo details"
// 				onRequestClose={() => history.push('/')}
// 			>
// 				<img
// 					className="Photo"
// 					src={url}
// 					alt=""
// 				/>
// 				<button
// 					onClick={() => history.push(`/photo/${allPhotos[index + 1].id}`)}
// 				>
// 					next
// 				</button>
// 				<button>previous</button>
// 			</Modal>
// 		</div>);
// };

export default DetailView;
