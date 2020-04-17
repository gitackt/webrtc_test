import { getVideoElement, getVideoStream } from './mediaStream';

export const createConnection = () => {
  return new RTCPeerConnection({
    iceServers: [{ urls: 'stun:1.2.3.4' }],
  });
};

export const setRemoteSdp = async (
  pc: RTCPeerConnection,
  offer: RTCSessionDescriptionInit
) => {
  // need receiving sdp
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
};

export const setLocalSdp = async (
  pc: RTCPeerConnection,
  stream: MediaStream
) => {
  pc.ontrack = (ev) => {
    const remoteVideo = getVideoElement(document, 'remoteVideo');
    remoteVideo.srcObject = ev.streams[0];
  };
  pc.addEventListener('icecandidate', (ev) => {
    if (ev.candidate !== null) {
    }
  });
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  // need sending sdp
};

export const startPeer = async (pc: RTCPeerConnection, stream: MediaStream) => {
  setLocalSdp(pc, stream);
  const dummy = await pc.createOffer();
  setRemoteSdp(pc, dummy);
};

export const stopPeer = (document: Document) => {
  getVideoStream(document, 'localVideo')
    .getTracks()
    .forEach((track) => {
      track.stop();
    });
};
