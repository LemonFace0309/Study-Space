const getClosestImageSize = (images, size) => {
  if (!images) return {};
  return images.reduce((closest, image) => {
    if (Math.abs(image.height - size) < Math.abs(closest.height - size)) return image;
    return closest;
  }, images[0]);
};

export default getClosestImageSize;
