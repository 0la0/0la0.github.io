import {
  BoxBufferGeometry,
  Color,
  FrontSide,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
} from 'three';
import { buildPoint, } from './PointBuilder';
import themeStore from '../../../modules/ThemeStore';

const renderOptions = {
  elevationMin: 750,
  elevationMax: 1250,
  skipPoints: 6,
  animationSpeed: 0.35,
  pointSize: 0.007,
  mapSize: 2,
  centerX: 0.15,
  centerY: 0.1,
  elevationScale: 0.1,
  ttlDuration: 10000,
};

const themedColors = {
  light: new Color(0.02, 0.02, 0.05),
  dark: new Color(0.7, 0.75, 0.95),
};
const getThemedColor = () => themeStore.isLight() ? themedColors.light : themedColors.dark;

export default class PointRenderer {
  constructor(profile) {
    const { activities, bounds, } = profile;
    // TODO: modify source instead of map/filter
    const allPoints = activities
      .flatMap(activity => activity.points)
      .filter((_, index) => index % renderOptions.skipPoints === 0);
    const aspectRatio = (bounds.maxlon - bounds.minlon) / (bounds.maxlat - bounds.minlat);
    const pointGeometry = new BoxBufferGeometry(renderOptions.pointSize, renderOptions.pointSize, renderOptions.pointSize);
    const pointMaterial = new MeshBasicMaterial({ side: FrontSide, color: getThemedColor(), });
    this.mesh = new InstancedMesh(pointGeometry, pointMaterial, allPoints.length);
    this.points = allPoints.map(point => buildPoint(point, aspectRatio, renderOptions));
    this.animatedIndex = 0;
    themeStore.subscribe(this);
  }

  handleThemeChange() {
    this.mesh.material.color = getThemedColor();
    this.mesh.material.needsUpdate = true;
  }

  getMesh() {
    return this.mesh;
  }

  update(elapsedTime) {
    const objectProxy = new Object3D();
    const pointsPerFrame = Math.floor(elapsedTime * renderOptions.animationSpeed)
    const lowerBound = this.animatedIndex;
    const upperBound = Math.min(lowerBound + pointsPerFrame, this.points.length - 1);
    this.points.forEach((point, index) => {
      if (index >= lowerBound && index <= upperBound) {
        point.turnOn();
        objectProxy.position.copy(point.position);
        objectProxy.scale.copy(point.scale);
        objectProxy.updateMatrix();
        this.mesh.setMatrixAt(index, objectProxy.matrix);
      } else if (point.ttl) {
        point.update(elapsedTime);
        objectProxy.position.copy(point.position);
        objectProxy.scale.copy(point.scale);
        objectProxy.updateMatrix();
        this.mesh.setMatrixAt(index, objectProxy.matrix);
      }
    });
    this.mesh.instanceMatrix.needsUpdate = true;
    this.animatedIndex = (this.animatedIndex + pointsPerFrame) % this.points.length;
  }

  dispose() {
    this.mesh?._geometry?.dispose();
    this.mesh?._material?.dispose();
  }
}