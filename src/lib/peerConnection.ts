import { getVideoElement, getVideoStream } from './mediaStream';

export const createConnection = () => {
  return new RTCPeerConnection({
    iceServers: [{ urls: 'stun:1.2.3.4' }],
  });
};

export const startPeer = async (
  pc: RTCPeerConnection,
  stream: MediaStream,
  document: Document
) => {
  pc.ontrack = (ev) => {
    const remoteVideo = getVideoElement(document, 'remoteVideo');
    remoteVideo.srcObject = ev.streams[0];
  };
  const localVideo = getVideoElement(document, 'localVideo');
  localVideo.srcObject = stream;
  for (const track of stream.getTracks()) {
    pc.addTrack(track, stream);
  }
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  // need sending sdp

  // need receiving sdp
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
};

export const stopPeer = (document: Document) => {
  const localStream = getVideoStream(document, 'localVideo');
  if (localStream) {
    const mediaStream = localStream as MediaStream;
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }
};
