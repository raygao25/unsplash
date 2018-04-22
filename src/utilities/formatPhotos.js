import React from 'react';

/**
 * Function to return a formatted grid of photos
 */
const formatPhotos = (newPhotos) => {
	console.log('reformated');
	const windowWidth = window.innerWidth - 10;
	const defaultPhotoHeight = 300;

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
				const alteredHeight = (windowWidth / (acc.curRowWidth + curPhotoWidth)) * defaultPhotoHeight;
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
