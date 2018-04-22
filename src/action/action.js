import makeActionCreator from 'make-action-creator';

export const loadPhoto = makeActionCreator('LOAD_PHOTO');

export const reformatPhoto = makeActionCreator('REFORMAT_PHOTO');

export const clickOnPhoto = makeActionCreator('CLICK_ON_PHOTO');
