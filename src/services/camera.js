// open the camera stream
export const CameraStart = async () => {
  navigator.getUserMedia(
    // constraints
    {
      video: true,
      audio: false
    },

    // successCallback
    function (stream) {
      const video = document.querySelector("video");
      video.srcObject = stream;
    },

    // errorCallback
    function (stream) {
      const errorMessage =
        "This browser does not support video capture, or this device does not have a camera";
      alert(errorMessage);
    }
  );
};

//stoping camera
export const CameraStop = async () => {
  const video = document.querySelector("video");
  let stream = video.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  video.srcObject = null;
};
