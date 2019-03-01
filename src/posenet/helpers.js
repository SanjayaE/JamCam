import * as posenet from '@tensorflow-models/posenet';

export const getImagePositions = async (video) => {
    const imageScaleFactor = 0.5;
    const outputStride = 16;
    const flipHorizontal = true;
    let net = await posenet.load();
    const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
    console.log(pose)
    return pose;
}



