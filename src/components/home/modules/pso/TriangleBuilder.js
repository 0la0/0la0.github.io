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
  // const lineGeometry1 = new Geometry();
  // const lineGeometry2 = new Geometry();
  // const lineGeometry3 = new Geometry();
  // const lineMaterial = new LineBasicMaterial({color});
  const v1 = new Vector3(-buffer, -buffer, 0);
  const v2 = new Vector3(-buffer,  buffer, 0);
  const v3 = new Vector3( buffer,  buffer, 0);
  triangleGeometry.vertices.push(v1);
  triangleGeometry.vertices.push(v2);
  triangleGeometry.vertices.push(v3);
  triangleGeometry.faces.push(new Face3(0, 1, 2));
  triangleMaterial.transparent = true;
  triangleMaterial.opacity = 0.5;

  // lineGeometry1.vertices.push(v1);
  // lineGeometry1.vertices.push(v2);
  // lineGeometry2.vertices.push(v2);
  // lineGeometry2.vertices.push(v3);
  // lineGeometry3.vertices.push(v3);
  // lineGeometry3.vertices.push(v1);

  return new Mesh(triangleGeometry, triangleMaterial);
  // const line1 = new Line(lineGeometry1, lineMaterial);
  // const line2 = new Line(lineGeometry2, lineMaterial);
  // const line3 = new Line(lineGeometry3, lineMaterial);
  // const group = new Group();
  // group.add(triangleMesh);
  // return group;
  // return triangleMesh;
}
