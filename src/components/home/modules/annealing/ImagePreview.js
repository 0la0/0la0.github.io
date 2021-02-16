import {
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  TextureLoader,
  Vector2,
} from 'three';

const previewZPosition = 0;
const previewDuration = 2500;

export default class ImagePreview {
  constructor(dims, imagePath) {
    const previewImageTexture = new TextureLoader().load(imagePath);
    const imagePreviewGeometry = new PlaneGeometry(dims.width, dims.height);
    const imagePreviewMaterial = new MeshBasicMaterial({ map: previewImageTexture, side: FrontSide, transparent: true, });
    this.previewMesh = new Mesh(imagePreviewGeometry, imagePreviewMaterial);
    this.previewMesh.position.z = previewZPosition;
    this.previewMesh.visible = false;
    this.raycaster = new Raycaster();
    this.previewTTL = 0;
  }

  getMesh() {
    return this.previewMesh;
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