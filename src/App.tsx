import React from 'react';
import './App.css';

const startPeer = async (
  pc: RTCPeerConnection,
  stream: MediaStream,
  document: Document
) => {
  pc.ontrack = (ev) => {
    console.warn(ev.streams[0]);
    const remoteVideo = document.getElementById(
      'remoteVideo'
    ) as HTMLVideoElement;
    remoteVideo.srcObject = ev.streams[0];
  };
  const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
  localVideo!.srcObject = stream;
  for (const track of stream.getTracks()) {
    pc.addTrack(track, stream);
  }
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  console.warn(pc.localDescription);
  console.warn(pc.remoteDescription);
};

const stopPeer = (document: Document) => {
  const localStream = document.querySelector('video')!.srcObject;
  if (localStream) {
    const mediaStream = localStream as MediaStream;
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }
};

const App: React.FC = () => {
  const [recording, setRecording] = React.useState(false);
  const [pc] = React.useState(
    new RTCPeerConnection({
      iceServers: [{ urls: 'stun:1.2.3.4' }],
    })
  );

  React.useEffect(() => {
    if (recording) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: window.innerWidth, height: window.innerHeight },
          audio: true,
        })
        .then(async (stream) => {
          startPeer(pc, stream, document);
        });
      pc.addEventListener('icecandidate', (ev) => {
        if (ev.candidate !== null) {
        }
      });
    } else {
      stopPeer(document);
    }
  }, [pc, recording]);

  return (
    <div className="App">
      <video autoPlay className="videoObject" id="localVideo"></video>
      <video autoPlay className="videoObject" id="remoteVideo"></video>
      <div className="recordButton" onClick={() => setRecording(!recording)}>
        Record
      </div>
    </div>
  );
};

export default App;
