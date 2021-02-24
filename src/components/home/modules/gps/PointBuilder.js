import LocationPoint from './LocationPoint';
import { clamp, } from '../mathUtil';
import { Vector3 } from 'three';

const footToMeter = ft => ft * 0.3048;
const PROJECTION_APPROXIMATION = 0.85;

const normalizeElevation = (elevation = 0, renderOptions) => {
  const elevationMin = footToMeter(renderOptions.elevationMin);
  const elevationMax = footToMeter(renderOptions.elevationMax);
  const elevationRange = elevationMax - elevationMin;
  const clampedElevation = clamp(elevation, elevationMin, elevationMax);
  const normalized = (clampedElevation - elevationMin) / elevationRange;
  return normalized * renderOptions.elevationScale - (renderOptions.elevationScale / 2);
};

export const buildPoint = (point, aspectRatio, renderOptions) => {
  const position = new Vector3(
    ((point.lon - 0.5) * renderOptions.mapSize * PROJECTION_APPROXIMATION) - renderOptions.centerX,
    normalizeElevation(point.elevation, renderOptions),
    ((point.lat - 0.5) * renderOptions.mapSize / aspectRatio) + renderOptions.centerY
  );
  return new LocationPoint(position, renderOptions.ttlDuration);
};