import { Color, Euler, Vector3, } from 'three';
import DIMENSIONS from './Dimensions';
import { TWO_PI, } from '../mathUtil';

const PROPERTY_BUFFER = 0.5;

export const getDisplayPropertiesFromSearchState = (searchState) => ({
  position: new Vector3(
    searchState.vector[DIMENSIONS.POSITION_X],
    searchState.vector[DIMENSIONS.POSITION_Y],
    searchState.vector[DIMENSIONS.POSITION_Z]
  ),
  rotation: new Euler(
    (searchState.vector[DIMENSIONS.ROTATE_X] + PROPERTY_BUFFER) * TWO_PI,
    (searchState.vector[DIMENSIONS.ROTATE_Y] + PROPERTY_BUFFER) * TWO_PI,
    (searchState.vector[DIMENSIONS.ROTATE_Z] + PROPERTY_BUFFER) * TWO_PI,
    'XYZ'
  ),
  scale: new Vector3(
    searchState.vector[DIMENSIONS.SCALE_X] + PROPERTY_BUFFER,
    searchState.vector[DIMENSIONS.SCALE_Y] + PROPERTY_BUFFER,
    searchState.vector[DIMENSIONS.SCALE_Z] + PROPERTY_BUFFER
  ),
  color: new Color(
    searchState.vector[DIMENSIONS.COLOR_R] + PROPERTY_BUFFER,
    searchState.vector[DIMENSIONS.COLOR_G] + PROPERTY_BUFFER,
    searchState.vector[DIMENSIONS.COLOR_B] + PROPERTY_BUFFER
  ),
});
