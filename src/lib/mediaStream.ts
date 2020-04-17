export const getMediaStream = async (navigator: Navigator) => {
  return await navigator.mediaDevices.getUserMedia({
    video: { width: window.innerWidth, height: window.innerHeight },
    audio: true,
  });
};

export const getVideoElement = (document: Document, elementIdName: string) => {
  const element = document.getElementById(elementIdName) as HTMLVideoElement;
  return element;
};

export const getVideoStream = (document: Document, elementIdName: string) => {
  const element = document.getElementById(elementIdName) as HTMLVideoElement;
  return element.srcObject as MediaStream;
};
