import React from 'react';
import '../app.css';

/**
 * Function to return a formatted grid of photos
 */
const formatPhotos = (newPhotos) => {
	const windowWidth = window.innerWidth - 20;
	const defaultPhotoHeight = 350;

	const photoGrid = newPhotos.reduce(
		(acc, curPhoto) => {
			const { id, ratio, urls } = curPhoto;
			const curPhotoWidth = defaultPhotoHeight * ratio;
			const curRow = [...acc.curRow, {
				id,
				ratio,
				urls,
			}];

			if (acc.curRowWidth + curPhotoWidth > windowWidth) {
				const padding = (curRow.length - 1) * 10;
				const alteredHeight = ((windowWidth - padding) / (acc.curRowWidth + curPhotoWidth)) * defaultPhotoHeight;
				return {
					photoGrid: [...acc.photoGrid,
						(
							<div className="PhotoRow" key={`PhotoRow${id}`}>
								{curRow.map((photo) => (
									<img
										className="Photo"
										height={`${alteredHeight}px`}
										key={photo.id}
										src={photo.urls.small}
										alt=""
									/>
								))}
							</div>
						),
					],
					curRow: [],
					curRowWidth: 0,
				};
			}
			return {
				...acc,
				curRow,
				curRowWidth: acc.curRowWidth + curPhotoWidth,
			};
		},
		{ photoGrid: [], curRow: [], curRowWidth: 0 }
	);
	return photoGrid.photoGrid;
};

export default formatPhotos;
