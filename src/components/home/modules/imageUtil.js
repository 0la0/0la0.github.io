
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = error => reject(error);
    image.src = src;
  });
}

function getImageData(imageElement) {
  const { width, height } = imageElement;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  context.drawImage(imageElement, 0, 0);
  return context.getImageData(0, 0, width, height);
}

function getGreyScaleArray(imageData) {
  const { width, height } = imageData;
  const greyscaleList = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const averageRGB = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    greyscaleList.push(averageRGB / 255);
  }
  return greyscaleList;
}

export { loadImage, getImageData, getGreyScaleArray };
