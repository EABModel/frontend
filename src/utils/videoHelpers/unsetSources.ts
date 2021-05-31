// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const unsetSources = async ({ peerConnection, webcamVideo, remoteVideo }: any): Promise<void> => {
  await navigator.mediaDevices.getUserMedia({ video: false });
  peerConnection.close();
  if (webcamVideo && remoteVideo) {
    webcamVideo.srcObject = null;
    remoteVideo.srcObject = null;
  }
};

export default unsetSources;
