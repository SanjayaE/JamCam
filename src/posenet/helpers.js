import * as posenet from '@tensorflow-models/posenet';

export const getImagePosition = async image => {
  var imageScaleFactor = 0.2;
  var outputStride = 32;
  var flipHorizontal = false;
  const net = await posenet.load();
  const pose = await net.estimateSinglePose(
    image,
    imageScaleFactor,
    flipHorizontal,
    outputStride
  );
  //   console.log(pose);
  return pose;
};
