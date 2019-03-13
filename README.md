## JamCam

**JamCam** lets you control beats and sounds with your body, by just using your webcam. This React frontend app lets you make music via the position of your body detected by your webcam and even download them to play offline later.
Just like the music JamCam makes is a beautiful harmony, our design philosophy is a harmony of two core principles:

1. **Minimalistic and simple :** easy to understand and make music, Users can pick up and play without any prior knowledge of making music (or even rhythm) to make something that sounds cool right away.
2. **Joyful and addictive :** introducing a very interactive and fun way to make music, no instruments to master, no jargon, just move your body and make cool music.

### JamCam team

- **Matt** Esteves
- **Julia** Romanowski
- **Dushantha** Ekanayake

### Technology

JamCam is built in Node.Js and powered by the front end library React with various other npm modules (see the dependencies section). We used **TensorFlow-js**, a paradigm-shifting JavaScript library that bridges the gap between frontend web developers and the formerly cumbersome process of training and taming AIs.

In the past, many of the best Machine Learning (ML) and Deep Learning (DL) frameworks required fluency in Python and its associated library ecosystem. Efficient training of ML models required the use of special-purpose hardware and software, such as NVIDIA GPUs and CUDA. Besides allowing you to code in JavaScript, the real-game changer with TensorFlow.js is that it lets you do everything client-side , with the comfort of your own favourite browser!

**PoseNet** is a pre-trained TensorFlow.js model (developed by the Google creative labs) which performs real-time estimation of 17 key body point positions.

For the purpose of our JamCam app, we are using Posenet single pose algorithm that can detect only one person in an image/video.In the first step of pose estimation, an image is fed through a pre-trained model corresponding to a MobileNet v1 architecture with default multiplier(0.75). Single pose estimation is the simpler and faster of the two PoseNet algorithms. Its ideal use case is capturing the pose of a single person in an image or video. The disadvantage is that if there are multiple people in an image/video, keypoints from both people will likely be estimated as being part of the same single pose —meaning, for example, that person #1’s left arm and person #2’s right knee might be conflated by the algorithm as belonging to the same pose.

After feeding the video data, posenet returns pose with a confidence score and an array of keypoints indexed by body part id, each with a score based on the algorithm's confidence that it has accurately captured that keypoint, and each keypoint’s position. We used this data to map the areas of screen to detect the specific user input.
**Tone.js** is a framework for creating interactive music in the browser. It provides advanced scheduling capabilities, synths and effects, and intuitive musical abstractions built on top of the Web Audio API.

### Development

- Install Node.js
- Clone and Run `npm install`
- Then start the app with `npm run`
- Open [http://localhost:3006](http://localhost:3000) to view it in the browser.

### Dependencies

- tensorflow-models/posenet
- tensorflow/tfjs,
- react
- react-dom
- react-router-dom
- react-scripts
- tone

### Acknowledgements

- [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
- [Tensorflowjs](https://www.tensorflow.org/js)
- [ToneJs](https://tonejs.github.io/)
- Lighthouse Labs
