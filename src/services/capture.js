import * as posenet from "@tensorflow-models/posenet";
import * as tensorflow from "@tensorflow/tfjs";
import { drawKeypoints, drawSkeleton } from "./helpers.js";
import camera from "./camera.js";
import pose from "./pose.js";

//send video to posenet and estimate poses
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
  //   console.log("videoh", video.height);
  const net = await posenet.load();

  while (video.height > 0 && video.width > 0) {
    //console.log("ttt");
    const p = await net.estimateSinglePose(
      video,
      imageScaleFactor,
      flipHorizontal,
      outputStride
    );
    pose.set(p);
    //     let poses = [];
    //     poses.push(pose);
    console.log(pose);
    ctx.drawImage(video, 0, 0, video.width, video.height);

    drawKeypoints(pose.get().keypoints, 0.5, ctx);
    drawSkeleton(pose.get().keypoints, 0.5, ctx);
    await tensorflow.nextFrame();
  }
};

export default Capture;
