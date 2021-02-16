import {
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  TextureLoader,
  Vector2,
} from 'three';
import { PREVIEW_DURATION, } from './AnnealingConstants';

export default class ImagePreview {
  constructor() {
    const imagePreviewGeometry = new PlaneGeometry();
    const imagePreviewMaterial = new MeshBasicMaterial({ side: FrontSide, transparent: true, });
    this.previewMesh = new Mesh(imagePreviewGeometry, imagePreviewMaterial);
    this.previewMesh.visible = false;
    this.raycaster = new Raycaster();
    this.previewTTL = 0;
  }

  getMesh() {
    return this.previewMesh;
  }

  reset(displayDims, imagePath) {
    const previewImageTexture = new TextureLoader().load(imagePath);
    this.previewMesh.visible = false;
    this.previewMesh.scale.x = displayDims.width;
    this.previewMesh.scale.y = displayDims.height;
    this.previewMesh.material.map = previewImageTexture;
    this.previewTTL = 0;  
  }

  onClick(event, camera) {
    const clickPosition = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(clickPosition, camera);
    const clickIntersections = this.raycaster.intersectObjects([ this.previewMesh, ]);
    if (!clickIntersections.length) {
      return;
    }
    this.previewTTL = PREVIEW_DURATION;
    this.previewMesh.visible = true;
  }

  disable() {
    this.previewTTL = 0;
    this.previewMesh.visible = false;
  }

  update(elapsedTime) {
    if (this.previewTTL <= 0) {
      return;
    }
    this.previewMesh.material.opacity = this.previewTTL / (PREVIEW_DURATION + 500);
    this.previewTTL -= elapsedTime;
    if (this.previewTTL <= 0) {
      this.previewTTL = 0;
      this.previewMesh.visible = false;
    }
  }
}