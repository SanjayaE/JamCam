// open the camera stream
const Camera = async () => {
  navigator.getUserMedia(
    // constraints
    {
      video: true,
      audio: false
    },

    // successCallback
    function(stream) {
      const video = document.querySelector("video");
      video.srcObject = stream;
    },

    // errorCallback
    function(stream) {
      const errorMessage =
        "This browser does not support video capture, or this device does not have a camera";
      alert(errorMessage);
    }
  );
};

export default Camera;
