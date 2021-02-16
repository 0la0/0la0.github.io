import { loadImage, getImageData, getGreyScaleArray } from 'components/home/modules/imageUtil';

export const imagePaths = [
  'assets/images/sketches/bike01.jpg',
  'assets/images/sketches/bike02.jpg',
];

const loadImageTexture = imagePath => loadImage(imagePath)
  .then((imgSrc) => Promise.all([
    Promise.resolve({ width: imgSrc.width, height: imgSrc.height }),
    getImageData(imgSrc)
  ]))
  .then(([ imgDims, imageData ]) => Promise.all([
    Promise.resolve(imgDims),
    getGreyScaleArray(imageData)
  ]))
  .then(([imgDims, greyScaleArray]) => Promise.resolve({ imgDims, greyScaleArray, imagePath, }));

export const loadAllTextures = () => {
  const loadTextures = imagePaths.map(imagePath => loadImageTexture(imagePath));
  return Promise.all(loadTextures);
};
