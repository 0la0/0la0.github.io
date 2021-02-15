import {
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';

const buttonSize = 0.1;
const previewZPosition = 0.0005;
const previewDuration = 2500;
const buttonPositionBuffer = (buttonSize / 2) + 0.02;

export default class ImagePreview {
  constructor(width, height, imagePath) {
    const previewImageTexture = new TextureLoader().load(imagePath);
    const previewIconTexture = new TextureLoader().load('assets/images/sketches/material_preview_icon.png');
    const imagePreviewGeometry = new PlaneGeometry(width, height);
    const imagePreviewMaterial = new MeshBasicMaterial({ map: previewImageTexture, side: FrontSide, transparent: true, });
    const clickGeometry = new PlaneGeometry(buttonSize, buttonSize);
    const clickMaterial = new MeshBasicMaterial({ map: previewIconTexture, side: FrontSide, });
    this.previewMesh = new Mesh(imagePreviewGeometry, imagePreviewMaterial);
    this.previewMesh.position.z = previewZPosition;
    this.previewMesh.visible = false;
    this.clickMesh = new Mesh(clickGeometry, clickMaterial);
    this.clickMesh.position.copy(new Vector3((width / 2) + buttonPositionBuffer, -(height / 2) - buttonPositionBuffer, previewZPosition));
    this.raycaster = new Raycaster();
    this.previewTTL = 0;
  }

  getMesh() {
    return [
      this.previewMesh,
      this.clickMesh,
    ];
  }

  onClick(event, camera) {
    const clickPosition = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(clickPosition, camera);
    const clickIntersections = this.raycaster.intersectObjects([ this.clickMesh, ]);
    if (!clickIntersections.length) {
      return;
    }
    this.previewTTL = previewDuration;
    this.previewMesh.visible = true;
  }

  update(elapsedTime) {
    if (this.previewTTL <= 0) {
      return;
    }
    this.previewMesh.material.opacity = this.previewTTL / previewDuration;
    this.previewTTL -= elapsedTime;
    if (this.previewTTL <= 0) {
      this.previewTTL = 0;
      this.previewMesh.visible = false;
    }
  }
}