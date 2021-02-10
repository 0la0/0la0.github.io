import {
  MeshBasicMaterial,
  DoubleSide,
  Geometry,
  Vector3,
  Face3,
  Mesh,
  Group,
  LineBasicMaterial,
  Line,
} from 'three';

export default function buildTriangle(center, size, color) {
  const buffer = size / 2;
  const triangleMaterial = new MeshBasicMaterial({color, side: DoubleSide});
  const triangleGeometry = new Geometry();
  const v1 = new Vector3(-buffer, -buffer, 0);
  const v2 = new Vector3(-buffer,  buffer, 0);
  const v3 = new Vector3( buffer,  buffer, 0);
  triangleGeometry.vertices.push(v1);
  triangleGeometry.vertices.push(v2);
  triangleGeometry.vertices.push(v3);
  triangleGeometry.faces.push(new Face3(0, 1, 2));
  triangleMaterial.transparent = true;
  triangleMaterial.opacity = 0.5;
  return new Mesh(triangleGeometry, triangleMaterial);
}
