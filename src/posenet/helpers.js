import * as posenet from "@tensorflow-models/posenet";

//setting colours for skeleton
const color = "aqua";
const color2 = "red";
const lineWidth = 2;

function toTuple({ y, x }) {
  return [y, x];
}

export const getImagePosition = async image => {
  var imageScaleFactor = 0.5;
  var outputStride = 16;
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

/**
 * Draws a points on a canvas
 */
export function drawKeypoints(keypoints, skeletonColor, ctx, scale = 1) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= 0.2) {
      const { y, x } = keypoint.position;
      ctx.beginPath();
      ctx.arc(x * scale, y * scale, 3, 0, 2 * Math.PI);
      ctx.fillStyle = color2;
      ctx.fill();
    }
  });
}

/**
 * Draws a line on a canvas
 */
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}
