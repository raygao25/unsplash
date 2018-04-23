import React from 'react';
import { Link } from 'react-router-dom';

import '../style.css';

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
									<Link
										to={`/photo/${photo.id}`}
										tabIndex="0"
										id={photo.id}
										key={photo.id}
										href={`/photo/${photo.id}`}
									>
										<img
											className="Photo"
											height={`${alteredHeight}px`}
											src={photo.urls.small}
											alt=""
										/>
									</Link>
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
