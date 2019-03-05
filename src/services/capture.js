import * as posenet from "@tensorflow-models/posenet";
import * as tensorflow from "@tensorflow/tfjs";
import { drawKeypoints, drawSkeleton } from "./helpers.js";
import camera from "./camera.js";
import pose from "./pose.js";
import keyboard from "./keyboard.js";

/* ***** send video to posenet and estimate poses ***** */
const Capture = async () => {
  camera(); // camera module
  const canvas = document.getElementById("overlay");
  const video = document.getElementById("video");
  //console.log(video);
  const ctx = canvas.getContext("2d");
  canvas.setAttribute("width", `${video.width}`);
  canvas.setAttribute("height", `${video.height}`);
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
    pose.set(p);
    console.log(pose);
    ctx.drawImage(video, 0, 0, video.width, video.height);

    drawKeypoints(pose.get().keypoints, 0.5, ctx);
    drawSkeleton(pose.get().keypoints, 0.5, ctx);

    /* *****play Synth notes based on key-point (partNum) position ***** */
    // keyBoard(0); //nose
    keyboard(9, pose.get()); //left wrist
    keyboard(10, pose.get()); //right wrist
    await tensorflow.nextFrame();
  }
};

export default Capture;
