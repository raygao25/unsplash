import React from 'react';


/**
 * Component to render photo in full screen
 */
const DetailView = (props) => (
	<div className="DetailView">
		Photo details
		{props.match.params.id}
	</div>
);

export default DetailView;
