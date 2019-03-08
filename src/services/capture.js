import * as posenet from '@tensorflow-models/posenet';
import * as tensorflow from '@tensorflow/tfjs';
import { drawKeypoints, drawSkeleton } from './helpers.js';
import pose from './pose.js';

const LEFT_WRIST_KEYPOINT = 9;
const RIGHT_WRIST_KEYPOINT = 10;

//send video to posenet and estimate poses
const Capture = async cb => {
  const canvas = document.getElementById('overlay');
  const video = document.getElementById('video');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('width', `${video.width}`);
  canvas.setAttribute('height', `${video.height}`);
  const imageScaleFactor = 0.5;
  const outputStride = 16;
  const flipHorizontal = false;
  const net = await posenet.load();

  //start tracking after video has loaded
  while (video.height > 0 && video.width > 0) {
    const p = await net.estimateSinglePose(
      video,
      imageScaleFactor,
      flipHorizontal,
      outputStride
    );

    //continuously set poses through video and pass points into drawImage function
    pose.set(p);
    ctx.drawImage(video, 0, 0, video.width, video.height);

    drawKeypoints(pose.get().keypoints, 0.5, ctx);
    drawSkeleton(pose.get().keypoints, 0.5, ctx);

    //only track right/left wrist points if confidence is above 50%
    if (p.score >= 0.5) {
      const bodyPartLocation = {
        leftWrist: {
          x: p.keypoints[LEFT_WRIST_KEYPOINT].position.x,
          y: p.keypoints[LEFT_WRIST_KEYPOINT].position.y
        },
        rightWrist: {
          x: p.keypoints[RIGHT_WRIST_KEYPOINT].position.x,
          y: p.keypoints[RIGHT_WRIST_KEYPOINT].position.y
        }
      };
      cb(bodyPartLocation);
    }

    await tensorflow.nextFrame();
  }
};

export default Capture;
