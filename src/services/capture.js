import * as posenet from '@tensorflow-models/posenet';
import * as tensorflow from '@tensorflow/tfjs';
import { drawKeypoints, drawSkeleton } from './helpers.js';
import camera from './camera.js';
import pose from './pose.js';
import keyboard from './keyboard.js';

const LEFT_WRIST_KEYPOINT = 9;
const RIGHT_WRIST_KEYPOINT = 10;

/* ***** send video to posenet and estimate poses ***** */
const Capture = async cb => {
  // camera(); // camera module
  const canvas = document.getElementById('overlay');
  const video = document.getElementById('video');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('width', `${video.width}`);
  canvas.setAttribute('height', `${video.height}`);
  const imageScaleFactor = 0.5;
  const outputStride = 16;
  const flipHorizontal = false;
  const net = await posenet.load();

  while (video.height > 0 && video.width > 0) {
    const p = await net.estimateSinglePose(
      video,
      imageScaleFactor,
      flipHorizontal,
      outputStride
    );

    // We want to update the video
    // We want to update App.js with new body location

    pose.set(p);
    // console.log(pose);
    ctx.drawImage(video, 0, 0, video.width, video.height);

    drawKeypoints(pose.get().keypoints, 0.5, ctx);
    drawSkeleton(pose.get().keypoints, 0.5, ctx);

    /* *****play Synth notes based on key-point (partNum) position ***** */
    // const currentPose = pose.get();
    // const significationMovement = false;
    if (p.score >= 0.4) {
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

    // const bodyPartLocation = {
    //   leftWrist: {
    //     x: p.keypoints[LEFT_WRIST_KEYPOINT].position.x,
    //     y: p.keypoints[LEFT_WRIST_KEYPOINT].position.y
    //   },
    //   rightWrist: {
    //     x: p.keypoints[RIGHT_WRIST_KEYPOINT].position.x,
    //     y: p.keypoints[RIGHT_WRIST_KEYPOINT].position.y
    //   }
    // };
    // let Y = p.keypoints[number].position.y;
    // let X = p.keypoints[number].position.x;
    // cb(bodyPartLocation);
    // keyboard(leftWristKeyPoint, pose.get()); //left wrist
    // keyboard(rightWristKeypoint, pose.get()); //right wrist
    await tensorflow.nextFrame();
  }
};

export default Capture;
